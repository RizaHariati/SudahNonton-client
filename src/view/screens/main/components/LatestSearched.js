import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ExpoFastImage from "expo-fast-image";
import { Text } from "react-native-paper";
import { theme } from "../../../../styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { windowWidth } from "../../../../context/initValues";
import { useGlobalContext } from "../../../../context/AppContext";

const LatestSearched = ({ item, navigation }) => {
  const { getSingleMovie, getSingleTvShow } = useGlobalContext();
  return (
    <TouchableOpacity
      style={styles.row}
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
      <Text style={styles.text}>
        {"movie_id" in item ? item.title : item.name}
      </Text>
      <Ionicons
        name="information-circle-outline"
        size={26}
        color={theme.colors.light}
        style={{ marginHorizontal: 16 }}
      />
    </TouchableOpacity>
  );
};

export default LatestSearched;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    marginBottom: 7,
    backgroundColor: theme.colors.primaryOpacity,
  },
  image: {
    width: windowWidth * 0.3,
    height: "100%",
    resizeMode: "cover",
  },
  text: {
    width: windowWidth * 0.5,
  },
});
