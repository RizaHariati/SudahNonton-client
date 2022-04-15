import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { windowWidth } from "../../../../context/initValues";
import { theme } from "../../../../styles/themes";
import SeeMore from "./SeeMore";
import ShowButton from "./ShowButton";

const LatestShows = ({ navigation, genre, shows, openBottomSheet }) => {
  const renderItem = ({ item, index }) => {
    if (index === shows.length - 1) {
      return <SeeMore navigation={navigation} genre={item.genres} />;
    } else {
      return (
        <ShowButton
          item={item}
          openBottomSheet={openBottomSheet}
          mVertical={0}
          mLeft={10}
          mHorizontal={0}
        />
      );
    }
  };

  return (
    <View style={styles.flatlistContainer}>
      <Title style={styles.title}>{genre}</Title>
      <FlatList
        data={shows}
        keyExtractor={(item, index) => "key" + index}
        horizontal
        initialNumToRender={4}
        maxToRenderPerBatch={1}
        windowSize={2}
        renderItem={renderItem}
        removeClippedSubviews={true}
      />
    </View>
  );
};

export default LatestShows;

const styles = StyleSheet.create({
  flatlistContainer: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    marginLeft: 16,
    color: theme.colors.light,
    letterSpacing: 1,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: windowWidth * 0.27,
    height: 160,
    resizeMode: "cover",
  },

  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: theme.colors.light,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    lineHeight: 12,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 70,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  comment: {
    zIndex: 2,
    width: 20,
    height: 25,
    color: theme.colors.light,
    backgroundColor: theme.colors.accent,
    position: "absolute",
    left: 7,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    elevation: 1,
  },
});
