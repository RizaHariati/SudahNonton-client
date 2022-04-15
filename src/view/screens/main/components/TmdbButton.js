import ExpoFastImage from "expo-fast-image";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { windowWidth } from "../../../../context/initValues";
import { LinearGradient } from "expo-linear-gradient";
import { Headline, Text } from "react-native-paper";
import { theme } from "../../../../styles/themes";
const TmdbButton = ({ item, type, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => navigation.navigate("Create", { item, type })}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w92${item.poster_path}` }}
        style={styles.image}
      />

      <LinearGradient
        colors={["transparent", theme.colors.backgroundopacitymid]}
        style={styles.gradient}
      ></LinearGradient>

      <View style={styles.textContainer}>
        <Headline style={styles.text}>
          {type === "movie" ? item.title : item.name}
        </Headline>
      </View>
    </TouchableOpacity>
  );
};

export default TmdbButton;

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
    marginVertical: 10,
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
