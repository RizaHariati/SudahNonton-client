import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { windowWidth } from "../../../../context/initValues";
import { theme } from "../../../../styles/themes";

const LatestLoading = ({ mVertical, mLeft, mHorizontal, getData }) => {
  const array = Array.from(Array(4).keys());
  const renderItem = () => {
    setTimeout(() => {}, 1000);
    return (
      <TouchableOpacity
        style={[
          styles.imageContainer,
          {
            marginVertical: mVertical,
            marginLeft: mLeft,
            marginHorizontal: mHorizontal,
          },
        ]}
      ></TouchableOpacity>
    );
  };

  return (
    <View
      style={styles.flatlistContainer}
      onMoveShouldSetResponder={() => getData()}
    >
      <FlatList
        data={array}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={2}
        renderItem={renderItem}
      />
    </View>
  );
};

export default LatestLoading;

const styles = StyleSheet.create({
  imageContainer: {
    width: windowWidth * 0.27,
    height: 160,
    borderRadius: 5,
    marginVertical: 0,
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.colors.backgroundopacitymid,
  },

  flatlistContainer: {
    width: "100%",
    marginBottom: 10,
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
