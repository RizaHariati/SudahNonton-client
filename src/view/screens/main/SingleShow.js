import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Headline,
  Text,
  Title,
} from "react-native-paper";
import { ScrollView } from "react-native-virtualized-view";
import { useGlobalContext } from "../../../context/AppContext";
import { globalstyles } from "../../../styles/globalstyles";
import { theme } from "../../../styles/themes";
import { Ionicons } from "@expo/vector-icons";
import SingleShowImage from "./components/SingleShowImage";
const urlMovie = "https://sudahnonton.000webhostapp.com/api/movies/";
const urlTvShow = "https://sudahnonton.000webhostapp.com/api/tvshows/";
const SingleShow = ({ navigation }) => {
  const {
    singleShow,
    loading,
    isLogin,
    getLoadingMovies,
    getLoadingTvshows,
    token,
  } = useGlobalContext();

  if (loading) {
    return (
      <View style={globalstyles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  }
  if (!singleShow) {
    <View style={globalstyles.container}></View>;
  } else {
    return (
      <View style={globalstyles.container}>
        <ScrollView
          style={{
            width: "100%",
          }}
        >
          <SingleShowImage show={singleShow} />

          <View style={styles.info}>
            <Text style={styles.paragraph}>
              {singleShow.overview.replace(/â€”/gi, "").replace(/â€™/gi, "'")}
            </Text>
            <View style={styles.row}>
              <Text>
                {"movie_id" in singleShow
                  ? `Release date : ${singleShow.release_date}`
                  : `Number of Seasons: ${singleShow.number_of_seasons}`}
              </Text>
              <Ionicons
                name="ellipse"
                size={5}
                color={theme.colors.light}
                style={{ marginHorizontal: 16 }}
              />
              <Text>{singleShow.genres} </Text>
            </View>
            {singleShow.is_favorite || singleShow.my_comment ? (
              <View style={styles.comment}>
                <View style={styles.row}>
                  <Text style={{ color: theme.colors.primary }}>
                    My comment :
                  </Text>
                  {singleShow.is_favorite ? (
                    <>
                      <Ionicons
                        name="heart"
                        size={20}
                        color={theme.colors.primary}
                        style={{ marginHorizontal: 16 }}
                      />
                      <Text style={{ color: theme.colors.primary }}>
                        It's good!
                      </Text>
                    </>
                  ) : null}
                </View>
                {singleShow.my_comment && (
                  <Text
                    style={{ color: theme.colors.primary, textAlign: "center" }}
                  >
                    -
                    {singleShow.my_comment
                      .replace(/"""/, "")
                      .replace(/"/, "")
                      .replace(/&nbsp;/, "")
                      .slice(5, -6)}
                    -
                  </Text>
                )}
              </View>
            ) : null}
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default SingleShow;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "46%",
    marginHorizontal: "2%",
    borderColor: theme.colors.accent,
  },

  info: {
    padding: 20,
  },
  paragraph: {
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  comment: {
    width: "96%",
    marginLeft: "2%",
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    textAlign: "center",
  },
  button: {
    width: "46%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: theme.colors.accent,
    paddingVertical: 5,
    marginRight: 10,
    marginHorizontal: "2%",
    borderRadius: 5,
  },
  textButton: {
    color: theme.colors.accent,
    fontSize: 14,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  buttonIcon: {
    marginRight: 20,
  },
});
