import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl, View } from "react-native";
import { ActivityIndicator, Headline, Text } from "react-native-paper";
import { globalstyles } from "../../../styles/globalstyles";
import SubHead from "./components/SubHead";
import { ScrollView } from "react-native-virtualized-view";
import MainImage from "./components/MainImage";
import { useGlobalContext } from "../../../context/AppContext";
import GetProps2 from "../../../utils/GetProps2";
import LatestShows from "./components/LatestShows";
import { theme } from "../../../styles/themes";
import LatestWatch from "./components/LatestWatch";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "./components/BottomSheetContent";
import { windowHeight } from "../../../context/initValues";
import { useFocusEffect } from "@react-navigation/native";
import LatestLoading from "./components/LatestLoading";

const TvShows = ({ navigation, route }) => {
  const {
    allTvShows,
    tvshows,
    loading,
    bottomSheetIndex,
    bottomSheetContent,
    getBottomSheetContent,
  } = useGlobalContext();

  const [offset, setOffset] = useState(0);
  const [renderData, setRenderData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const bottomSheetRef = useRef(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setOffset(0);
    bottomSheetRef.current?.close();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  /* ----------------- FLATLIST PAGINATION FUNCTIONS ---------------- */

  const getData = () => {
    if (tvshows) {
      const newData = tvshows.slice(offset, offset + 2);
      if (!renderData) {
        setRenderData([...newData]);
      } else {
        setRenderData([...renderData, ...newData]);
      }
    }
    setOffset(offset + 2);
  };

  useEffect(() => {
    getData();
  }, [tvshows]);

  /* --------------- END FLATLIST PAGINATION FUNCTIONS -------------- */

  /* -------------------- BOTTOM SHEET FUNCTIONS -------------------- */

  const snapPoints = ["40%"];

  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );
  const openBottomSheet = useCallback((index, item) => {
    let isMounted = true;

    if (isMounted) {
      bottomSheetRef.current?.snapToIndex(index);
      getBottomSheetContent(index, item);
    }
    return () => {
      return (isMounted = false);
    };
  }, []);

  const closeAndGoToSingleShow = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

  /* ------------------------ HEADER_BUTTONS ------------------------ */

  const onPressSearch = () => {
    navigation.navigate("Search");
  };

  const onPressBack = () => {
    navigation.navigate("Bottom");
  };

  /* ---------------------- END HEADER BUTTONS ---------------------- */

  /* ------------------ HEADER POSITIONS FUNCTIONS ------------------ */

  const scrollY = useRef(new Animated.Value(0)).current;
  const currentProps = GetProps2(scrollY);

  /* ----------------- END HEADER POSITION FUNCTIONS ---------------- */

  if (loading) {
    return (
      <View style={globalstyles.container}>
        <SubHead
          onPressSearch={onPressSearch}
          onPressBack={onPressBack}
          translateY={currentProps.translateY}
          colorRange={currentProps.colorRange}
          navigation={navigation}
          route={route}
        />
        <View>
          <ActivityIndicator
            animating={true}
            size="large"
            color={theme.colors.primary}
          />
        </View>
      </View>
    );
  } else {
    if (!tvshows) {
      return (
        <View style={globalstyles.container}>
          <SubHead
            onPressSearch={onPressSearch}
            onPressBack={onPressBack}
            translateY={currentProps.translateY}
            colorRange={currentProps.colorRange}
            navigation={navigation}
            route={route}
          />
          <View>
            <ActivityIndicator
              animating={true}
              size="large"
              color={theme.colors.primary}
            />
          </View>
        </View>
      );
    } else {
      if (!renderData) {
        return (
          <View style={globalstyles.container}>
            <SubHead
              onPressSearch={onPressSearch}
              onPressBack={onPressBack}
              translateY={currentProps.translateY}
              colorRange={currentProps.colorRange}
              navigation={navigation}
              route={route}
            />
            <View>
              <ActivityIndicator
                animating={true}
                size="large"
                color={theme.colors.primary}
              />
            </View>
          </View>
        );
      } else {
        /* ----------------- FLATLIST PAGINATION FUNCTIONS ---------------- */

        const renderFooter = () => {
          if (offset < tvshows.length) {
            return (
              <LatestLoading
                mVertical={0}
                mLeft={10}
                mHorizontal={0}
                getData={getData}
              />
            );
          } else {
            return <View></View>;
          }
        };

        /* --------------- END FLATLIST PAGINATION FUNCTIONS -------------- */
        const renderItem = ({ item, index }) => {
          if (index === 0 && allTvShows[0].is_favorite) {
            return (
              <>
                {allTvShows[0].is_favorite ? (
                  <MainImage show={allTvShows[1]} navigation={navigation} />
                ) : (
                  <MainImage show={allTvShows[0]} navigation={navigation} />
                )}
                <LatestShows
                  navigation={navigation}
                  openBottomSheet={openBottomSheet}
                  genre={item[0]}
                  shows={item[1]
                    .filter((data, index) => index !== 1)
                    .slice(0, 12)}
                />
              </>
            );
          } else if (index === 0 && !allTvShows[0].is_favorite) {
            return (
              <>
                {allTvShows[0].is_favorite ? (
                  <MainImage show={allTvShows[1]} navigation={navigation} />
                ) : (
                  <MainImage show={allTvShows[0]} navigation={navigation} />
                )}
                <LatestShows
                  navigation={navigation}
                  openBottomSheet={openBottomSheet}
                  genre={item[0]}
                  shows={item[1].slice(1, 13)}
                />
              </>
            );
          } else if (index === 2) {
            return (
              <>
                <LatestShows
                  navigation={navigation}
                  openBottomSheet={openBottomSheet}
                  genre={item[0]}
                  shows={item[1].slice(0, 13)}
                />
                <LatestWatch
                  title={"Latest Tv Shows Watched"}
                  shows={allTvShows.slice(1, 15)}
                  navigation={navigation}
                />
              </>
            );
          } else {
            return (
              <LatestShows
                navigation={navigation}
                openBottomSheet={openBottomSheet}
                genre={item[0]}
                shows={item[1].slice(0, 13)}
              />
            );
          }
        };
        return (
          <View style={globalstyles.container}>
            <View
              pointerEvents="box-none"
              style={{
                width: "100%",
                height: windowHeight,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
              }}
            >
              <BottomSheet
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                style={{ zIndex: 4 }}
                enablePanDownToClose={true}
                overDragResistanceFactor={1}
                backgroundStyle={globalstyles.bottomBackgroundStyle}
                index={bottomSheetIndex}
                handleStyle={globalstyles.handleStyle}
                animateOnMount={true}
              >
                {bottomSheetContent && (
                  <BottomSheetContent
                    navigation={navigation}
                    closeAndGoToSingleShow={closeAndGoToSingleShow}
                  />
                )}
              </BottomSheet>
            </View>

            <SubHead
              onPressSearch={onPressSearch}
              onPressBack={onPressBack}
              translateY={currentProps.translateY}
              colorRange={currentProps.colorRange}
              navigation={navigation}
              route={route}
            />

            <FlatList
              nestedScrollEnabled={true}
              maintainVisibleContentPosition={true}
              data={renderData}
              initialNumToRender={1}
              maxToRenderPerBatch={1}
              windowSize={5}
              keyExtractor={(item, index) => "key" + (index + offset)}
              renderItem={renderItem}
              removeClippedSubviews={true}
              ListFooterComponent={renderFooter}
              enableEmptySections={true}
              onEndReachedThreshold={5}
              style={{
                width: "100%",
                flex: 1,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
            />
          </View>
        );
      }
    }
  }
};

export default TvShows;
