import React, { useCallback, useRef } from "react";
import { FlatList, View } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useGlobalContext } from "../../../context/AppContext";
import { globalstyles } from "../../../styles/globalstyles";
import ShowButton from "../main/components/ShowButton";
// import SingleShowImage from "../main/components/SingleShowImage";
import BottomSheet from "@gorhom/bottom-sheet";
import BottomSheetContent from "../main/components/BottomSheetContent";
import { windowHeight } from "../../../context/initValues";

const Genre = ({ route, navigation }) => {
  const { allShows, bottomSheetContent, getBottomSheetContent } =
    useGlobalContext();
  const genre = route.params.genre;
  const genreList = allShows.filter((item) => item.genres === genre);
  const snapPoints = ["40%"];

  const bottomSheetRef = useRef(null);

  const openBottomSheet = useCallback((index, item) => {
    bottomSheetRef.current?.snapToIndex(index);
    getBottomSheetContent(index, item);
  }, []);

  const closeAndGoToSingleShow = useCallback(() => {
    bottomSheetRef.current.close();
  }, []);

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
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
      >
        {/* <SingleShowImage show={genreList[7]} /> */}
        <View style={{ alignItems: "center", marginLeft: 10 }}>
          <FlatList
            data={genreList}
            keyExtractor={(item, index) => "key" + index}
            initialNumToRender={3}
            maxToRenderPerBatch={2}
            numColumns={3}
            windowSize={2}
            renderItem={({ item }) => (
              <ShowButton
                item={item}
                openBottomSheet={openBottomSheet}
                mVertical={10}
                mLeft={0}
                mHorizontal={10}
              />
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Genre;
