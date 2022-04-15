import React from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Button, Headline, Text } from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { StyleSheet } from "react-native";
import ExpoFastImage from "expo-fast-image";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../../../context/AppContext";
import { theme } from "../../../styles/themes";
import { windowWidth } from "../../../context/initValues";
import { globalstyles } from "../../../styles/globalstyles";

const WatchList = ({ navigation }) => {
  const { watchList, getSingleMovie, getSingleTvShow, deleteListItem } =
    useGlobalContext();

  if (!watchList) {
    return (
      <View style={globalstyles.container}>
        <ScrollView style={styles.scrollView}>
          <Headline style={styles.headline}>WatchList</Headline>
          <Text style={styles.text1}>
            You can add Movies or Tv Shows that you are going to watch later.
          </Text>
          <Text style={styles.text1}>You haven't added any show</Text>
        </ScrollView>
      </View>
    );
  } else {
    const renderItem = ({ item }) => {
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
          <Button
            onPress={() => {
              const index =
                "movie_id" in item
                  ? { movie_id: item.movie_id }
                  : { tv_id: item.tv_id };

              deleteListItem(index);
            }}
            style={{ zIndex: 3 }}
          >
            <Ionicons
              name="trash-bin-outline"
              size={20}
              color={theme.colors.accent}
              style={{ marginHorizontal: 16 }}
            />
          </Button>
        </TouchableOpacity>
      );
    };
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Headline style={styles.headline}>Watch List</Headline>
          <FlatList
            data={watchList}
            keyExtractor={(item, index) => "key" + index}
            renderItem={renderItem}
            removeClippedSubviews={true}
          />
        </ScrollView>
      </View>
    );
  }
};

export default WatchList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    paddingTop: 15,
  },
  headline: {
    fontSize: 22,
    width: "100%",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollView: {
    textAlign: "center",
    width: "100%",
    marginTop: 10,
  },
  avatar: {
    backgroundColor: theme.colors.backgroundColor,
    color: theme.colors.text,
    marginRight: 15,
  },

  row: {
    width: "100%",
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
  text1: {
    width: "100%",
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
