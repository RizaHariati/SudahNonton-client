import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Text, Title } from "react-native-paper";
import { windowHeight } from "../../../../context/initValues";
import { globalstyles } from "../../../../styles/globalstyles";
import { theme } from "../../../../styles/themes";

const SingleShowImage = ({ show }) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w780${show.image}`,
        }}
        style={styles.image}
      />
      <LinearGradient
        colors={["transparent", theme.colors.backgroundopacitymid]}
        style={globalstyles.gradient}
      >
        <Title style={styles.title}>
          {"movie_id" in show ? show.title : show.name}
        </Title>
        <Text>{show.tagline} </Text>
      </LinearGradient>
    </View>
  );
};

export default SingleShowImage;

const styles = StyleSheet.create({
  title: {
    color: theme.colors.light,
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: windowHeight * 0.4,
    marginBottom: 10,
    zIndex: 0,
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: windowHeight * 0.4,
    resizeMode: "cover",
  },
});
