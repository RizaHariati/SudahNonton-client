import ExpoFastImage from "expo-fast-image";
import React from "react";
import {
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { windowWidth } from "../../../../context/initValues";
import { LinearGradient } from "expo-linear-gradient";
import { Headline, Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../styles/themes";
import { useGlobalContext } from "../../../../context/AppContext";
const ShowButton = ({
  item,
  openBottomSheet,
  mVertical,
  mLeft,
  mHorizontal,
  searching,
}) => {
  const { setSearch } = useGlobalContext();
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
      onPress={() => {
        openBottomSheet(0, item);
        if (searching) {
          {
            "movie_id" in item
              ? setSearch({ movie_id: item.movie_id })
              : setSearch({ tv_id: item.tv_id });
          }
        }
      }}
    >
      {item.my_comment && (
        <View style={styles.comment}>
          <Ionicons
            name="pricetag-outline"
            size={16}
            color={theme.colors.text}
          />
        </View>
      )}
      <ExpoFastImage
        uri={`https://image.tmdb.org/t/p/w300${item.image}`}
        cacheKey={"movie_id" in item ? item.movie_id : item.tv_id}
        style={styles.image}
      />

      <LinearGradient
        colors={["transparent", theme.colors.backgroundopacitymid]}
        style={styles.gradient}
      ></LinearGradient>
      <View style={styles.textContainer}>
        <Headline style={styles.text}>
          {"movie_id" in item ? item.title : item.name}
        </Headline>
      </View>
    </TouchableOpacity>
  );
};

export default ShowButton;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: windowWidth * 0.27,
    height: 160,
    resizeMode: "cover",
  },
  imageContainer: {
    width: windowWidth * 0.27,
    height: 160,
    borderRadius: 5,
    marginVertical: 0,
    overflow: "hidden",
    position: "relative",
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
    zIndex: 4,
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
