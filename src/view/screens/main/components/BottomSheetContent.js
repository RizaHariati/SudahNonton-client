import { BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Caption, Text, Title } from "react-native-paper";
import { windowWidth } from "../../../../context/initValues";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../../../styles/themes";
import { useGlobalContext } from "../../../../context/AppContext";

const BottomSheetContent = ({ navigation, closeAndGoToSingleShow }) => {
  const {
    bottomSheetContent,
    getSingleMovie,
    getSingleTvShow,
    addList,
    watchList,
    setBottomSheetIndex,
    bottomSheetIndex,
  } = useGlobalContext();

  return (
    <BottomSheetView style={styles.bottomContainer}>
      <Image
        style={styles.image}
        source={{
          uri: "https://image.tmdb.org/t/p/w300" + bottomSheetContent.image,
        }}
      />
      <View style={styles.bottomInfo}>
        <Title style={styles.title}>
          {"movie_id" in bottomSheetContent
            ? bottomSheetContent.title
            : bottomSheetContent.name}
        </Title>

        <View style={styles.row}>
          <Caption>
            {"movie_id" in bottomSheetContent
              ? `Year : ${bottomSheetContent.release_date.substring(6, 10)}`
              : `Seasons: ${bottomSheetContent.number_of_seasons}`}
          </Caption>
          <Ionicons
            name="ellipse"
            size={5}
            color={theme.colors.light}
            style={{ marginHorizontal: 16 }}
          />
          <Caption>{bottomSheetContent.genres} </Caption>
        </View>
        <Text style={styles.text}>
          {bottomSheetContent.overview.slice(0, 140)}...
        </Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={async () => {
              "movie_id" in bottomSheetContent
                ? await getSingleMovie(bottomSheetContent.id)
                : await getSingleTvShow(bottomSheetContent.id);

              setBottomSheetIndex(-1);
              bottomSheetIndex && closeAndGoToSingleShow();
              navigation.navigate("SingleShow");
            }}
            style={styles.button}
          >
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={theme.colors.light}
              style={styles.buttonIcon}
            />
            <Text style={styles.textButton}>Read More</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              let find = null;
              if (watchList) {
                find = watchList.find((item) => {
                  const result =
                    "movie_id" in item
                      ? item.movie_id === bottomSheetContent.movie_id
                      : item.tv_id === bottomSheetContent.tv_id;
                  return result;
                });
              }

              if (find) {
                Alert.alert(
                  "Alert",
                  `${
                    "movie_id" in bottomSheetContent
                      ? bottomSheetContent.title
                      : bottomSheetContent.name
                  } is already on your Watch List`,
                  [{ text: "OK" }]
                );
                bottomSheetIndex && setBottomSheetIndex(-1);
                closeAndGoToSingleShow();
                return;
              }
              "movie_id" in bottomSheetContent
                ? addList({ movie_id: bottomSheetContent.movie_id })
                : addList({ tv_id: bottomSheetContent.tv_id });
              Alert.alert(
                "Watch List",
                `${
                  "movie_id" in bottomSheetContent
                    ? bottomSheetContent.title
                    : bottomSheetContent.name
                } added to your Watch List`,
                [{ text: "OK" }]
              );
              bottomSheetIndex && setBottomSheetIndex(-1);
              closeAndGoToSingleShow();
            }}
            style={[styles.button, { borderColor: theme.colors.gray }]}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              style={[styles.buttonIcon, { color: theme.colors.gray }]}
            />
            <Text style={[styles.textButton, { color: theme.colors.gray }]}>
              Add to List
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetView>
  );
};

export default BottomSheetContent;

const styles = StyleSheet.create({
  bottomContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: theme.colors.background,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: windowWidth * 0.28,
    height: 190,
    borderRadius: 5,
    marginRight: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomInfo: {
    width: windowWidth * 0.56,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    lineHeight: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    paddingVertical: 5,
    paddingRight: 13,
    marginRight: 10,
    borderRadius: 3,
  },
  textButton: {
    color: theme.colors.primary,
    fontWeight: "100",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginHorizontal: 4,
    color: theme.colors.primary,
  },
});
