import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Headline, Title } from "react-native-paper";
import { windowWidth } from "../../../../context/initValues";
import { theme } from "../../../../styles/themes";
import ExpoFastImage from "expo-fast-image";
import { LinearGradient } from "expo-linear-gradient";

const SeeMore = ({ navigation, genre }) => {
  return (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => {
        navigation.navigate("Genre", { genre });
      }}
    >
      <LinearGradient
        colors={["transparent", theme.colors.backgroundopacitymid]}
        style={styles.gradient}
      ></LinearGradient>
      <View style={styles.textContainer}>
        <Headline style={styles.text}>See More..</Headline>
      </View>
    </TouchableOpacity>
  );
};

export default SeeMore;

const styles = StyleSheet.create({
  imageContainer: {
    width: windowWidth * 0.27,
    height: 160,
    borderRadius: 5,
    marginVertical: 0,
    // borderColor: theme.colors.primary,
    // borderWidth: 1,
    marginLeft: 10,
    overflow: "hidden",
    position: "relative",
    backgroundColor: theme.colors.backgroundopacitymid,
    elevation: 2,
    marginRight: 10,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 70,
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
});
