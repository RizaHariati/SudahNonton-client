import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { ActivityIndicator, Subheading, TextInput } from "react-native-paper";
import { useGlobalContext } from "../../../context/AppContext";
import { globalstyles } from "../../../styles/globalstyles";
import { theme } from "../../../styles/themes";
import GetGenres from "../../../utils/GetGenres";
import Label from "./components/Label";
import ShowButton from "./components/ShowButton";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "./components/BottomSheetContent";
import { windowHeight } from "../../../context/initValues";
import LatestSearched from "./components/LatestSearched";
import { useFocusEffect } from "@react-navigation/native";

const Search = ({ navigation }) => {
  const [keyword, setKeyword] = useState(null);
  const [result, setResult] = useState([]);
  const [resultGenres, setResultGenres] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const {
    allShows,
    allMovies,
    allTvShows,
    bottomSheetContent,
    getBottomSheetContent,
    latestSearched,
  } = useGlobalContext();

  useEffect(() => {
    let isMounted = true;
    let genres;
    if (isMounted) {
      if (allShows) {
        genres = GetGenres(allShows);
      }
      if (keyword) {
        const filter1 = allMovies.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        );
        const filter2 = allTvShows.filter((item) =>
          item.name.toLowerCase().includes(keyword.toLowerCase())
        );
        const filterShow = filter1.concat(filter2);
        const sortFilter = filterShow.sort((a, b) =>
          a.created_at > b.created_at ? -1 : 1
        );

        const filter3 = genres.filter((item) => item.includes(keyword));

        setResultGenres(filter3);
        setResult(sortFilter.slice(0, 25));
      }
    }
    return () => {
      isMounted = false;
    };
  }, [keyword, allShows]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setResult([]);
    setResultGenres([]);
    setKeyword(null);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const snapPoints = ["40%"];
  const bottomSheetRef = useRef(null);
  useFocusEffect(
    React.useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, [])
  );
  const openBottomSheet = useCallback((index, item) => {
    bottomSheetRef.current?.snapToIndex(index);
    getBottomSheetContent(index, item);
  }, []);

  const closeAndGoToSingleShow = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

  if (!allShows) {
    return (
      <View style={globalstyles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  } else {
    const renderLatestSearch = ({ item }) => {
      return <LatestSearched item={item} navigation={navigation} />;
    };
    return (
      <View style={globalstyles.container}>
        <TextInput
          label="Search movies, tv shows, or genres..."
          value={keyword}
          blurOnSubmit={false}
          onChangeText={(keyword) => setKeyword(keyword ? keyword : null)}
          underlineColor={theme.colors.primary}
          clearTextOnFocus={true}
          onSubmitEditing={() => Keyboard.dismiss()}
          left={
            <TextInput.Icon
              size={32}
              name="magnify"
              style={{ justifyContent: "flex-end" }}
            />
          }
          style={{
            width: "100%",
            height: 80,
            backgroundColor: theme.colors.primaryOpacity,
            color: theme.colors.light,
          }}
        />
        <View
          pointerEvents="box-none"
          style={{
            width: "100%",
            height: windowHeight,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 3,
          }}
        >
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            style={{ zIndex: 4 }}
            enablePanDownToClose={true}
            overDragResistanceFactor={1}
            backgroundStyle={globalstyles.bottomBackgroundStyle}
            index={-1}
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
        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!keyword && (
            <View>
              <Subheading style={styles.subHeading}>
                Last Search Result
              </Subheading>
              <FlatList
                data={latestSearched}
                keyExtractor={(item, index) => "key" + index}
                renderItem={renderLatestSearch}
                inverted={true}
                removeClippedSubviews={true}
              />
            </View>
          )}
          {keyword && (
            <View>
              {result.length < 1 && resultGenres.length < 1 ? (
                <Subheading style={styles.subHeading}>
                  No Result Found
                </Subheading>
              ) : (
                <>
                  {!resultGenres.length < 1 && (
                    <View style={styles.container}>
                      <Subheading style={styles.subHeading}>Genres</Subheading>
                      {resultGenres.map((item, index) => {
                        return (
                          <Label
                            key={index}
                            item={item}
                            navigation={navigation}
                          />
                        );
                      })}
                    </View>
                  )}
                  {!result.length < 1 && (
                    <View style={{ alignItems: "center", marginLeft: 10 }}>
                      <Subheading style={styles.subHeading}>Shows</Subheading>
                      <FlatList
                        data={result}
                        keyExtractor={(item, index) => "key" + index}
                        initialNumToRender={3}
                        maxToRenderPerBatch={2}
                        numColumns={3}
                        windowSize={2}
                        removeClippedSubviews={true}
                        renderItem={({ item }) => (
                          <ShowButton
                            item={item}
                            openBottomSheet={openBottomSheet}
                            mVertical={10}
                            mLeft={0}
                            mHorizontal={10}
                            searching={true}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    padding: 15,
  },
  subHeading: {
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    fontSize: 20,
  },
});
