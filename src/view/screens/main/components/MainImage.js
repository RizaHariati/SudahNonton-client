import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { globalstyles } from "../../../../styles/globalstyles";
import { theme } from "../../../../styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { Text, Title } from "react-native-paper";
import { useGlobalContext } from "../../../../context/AppContext";

const MainImage = ({ show, navigation }) => {
  const showData = Object(show);
  const { getSingleMovie, getSingleTvShow, setBottomSheetIndex } =
    useGlobalContext();
  if (!showData) return <View></View>;
  else {
    return (
      <View style={globalstyles.imageContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${showData.image}`,
          }}
          style={globalstyles.image}
        />
        <LinearGradient
          colors={[
            "transparent",
            theme.colors.backgroundopacitymid,
            theme.colors.background,
          ]}
          style={globalstyles.gradient}
        >
          <Title style={styles.title}>
            {"movie_id" in showData ? showData.title : showData.name}
          </Title>
          <Text>{showData.tagline} </Text>
          <View style={[globalstyles.row, { marginTop: 10 }]}>
            <Text style={globalstyles.smallText}>
              {"movie_id" in showData
                ? `Year : ${showData.release_date.slice(0, 4)}`
                : `Number of Seasons: ${showData.number_of_seasons}`}
            </Text>
            <Ionicons
              name="ellipse"
              size={5}
              color={theme.colors.light}
              style={{ marginHorizontal: 16 }}
            />
            <Text style={globalstyles.smallText}>{showData.genres} </Text>
            <Ionicons
              name="ellipse"
              size={5}
              color={theme.colors.light}
              style={{ marginHorizontal: 16 }}
            />

            <TouchableOpacity
              onPress={async () => {
                "movie_id" in showData
                  ? await getSingleMovie(showData.id)
                  : await getSingleTvShow(showData.id);
                setBottomSheetIndex(-1);
                navigation.navigate("SingleShow");
              }}
              style={styles.button}
            >
              <View style={globalstyles.row}>
                <Text style={globalstyles.smallText}>MORE INFO</Text>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color={theme.colors.text}
                  style={{ marginLeft: 5 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  }
};

export default MainImage;

const styles = StyleSheet.create({
  title: {
    color: theme.colors.light,
    fontSize: 20,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: theme.colors.gray,
    padding: 7,
    borderRadius: 5,
  },
});
