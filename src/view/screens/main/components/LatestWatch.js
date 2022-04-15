import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Headline, Text, Title } from "react-native-paper";
import { windowWidth } from "../../../../context/initValues";
import { theme } from "../../../../styles/themes";
import ExpoFastImage from "expo-fast-image";
import { LinearGradient } from "expo-linear-gradient";
import { useGlobalContext } from "../../../../context/AppContext";

const LatestWatch = ({ title, shows, navigation }) => {
  const { getSingleMovie, getSingleTvShow } = useGlobalContext();
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={async () => {
          "movie_id" in item
            ? await getSingleMovie(item.id)
            : await getSingleTvShow(item.id);

          navigation.navigate("SingleShow");
        }}
      >
        <ExpoFastImage
          uri={`https://image.tmdb.org/t/p/w300${item.image}`}
          cacheKey={"movie_id" in item ? item.movie_id : item.tv_id}
          style={styles.image}
        />
        <LinearGradient
          colors={[
            "transparent",
            theme.colors.backgroundopacitymid,
            theme.colors.backgroundopacitydark,
          ]}
          style={styles.gradient}
        ></LinearGradient>
        <View style={styles.textContainer}>
          <Headline style={styles.text}>
            {"movie_id" in item ? item.title : item.name}
          </Headline>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoText}>{item.genres}</Text>
          <Text style={styles.infoText}>
            {"movie_id" in item
              ? `year : ${item.release_date.slice(0, 4)}`
              : `seasons : ${item.number_of_seasons}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.flatlistContainer}>
      <Title style={styles.title}>{title}</Title>
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

export default LatestWatch;

const styles = StyleSheet.create({
  flatlistContainer: {
    width: "100%",
    marginBottom: 15,
    marginTop: 5,
  },
  title: {
    marginLeft: 16,
    fontSize: 22,
    color: theme.colors.primary,
    letterSpacing: 1,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: windowWidth * 0.33,
    height: 220,
    resizeMode: "cover",
  },
  imageContainer: {
    width: windowWidth * 0.33,
    height: 220,
    borderRadius: 5,
    marginVertical: 0,
    // borderColor: theme.colors.primary,
    // borderWidth: 1,
    marginLeft: 10,
    overflow: "hidden",
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 50,
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
    height: 145,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  info: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    zIndex: 1,
    backgroundColor: theme.colors.primaryOpacity,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 12,
    lineHeight: 12,
    textAlign: "left",
  },
});
