import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Caption, Subheading, Text } from "react-native-paper";
import { globalstyles } from "../styles/globalstyles";
import { theme } from "../styles/themes";
import { useGlobalContext } from "../context/AppContext";
import TmdbLogo from "../../assets/svg/TmdbLogo.svg";
const Welcome = (props) => {
  const { navigation } = props;
  const { getLoadingAllShows, allFavorites } = useGlobalContext();

  return (
    <View style={globalstyles.container}>
      <Image
        source={require("../../assets/TitleLogo.png")}
        style={styles.logoImage}
      />
      <Subheading style={styles.subheading}>
        Looking for something to watch? Check out my database of all the movies
        and tv shows I've ever watched!
      </Subheading>

      <View style={styles.usersContainer}>
        {allFavorites ? (
          <TouchableOpacity
            style={styles.logoButton}
            onPress={() => {
              navigation.navigate("Bottom");
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={styles.image}
            />
            <Text> ENTER</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.logoButton}
            onPress={() => {
              navigation.navigate("Bottom");
              getLoadingAllShows();
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={styles.image}
            />
            <Text style={{ width: 200, textAlign: "center" }}>
              LOAD & ENTER
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={() => Linking.openURL("https://www.themoviedb.org/")}
      >
        <Text style={styles.link}>
          all movies and tv show data belongs to -
        </Text>
        <TmdbLogo width={70} height={35} />
      </View>

      <Caption
        style={styles.link}
        onPress={() =>
          Linking.openURL("https://www.vecteezy.com/free-vector/movie")
        }
      >
        Logo design is by Movie Vectors from Vecteezy
      </Caption>
      <Caption
        style={styles.link}
        onPress={() =>
          Linking.openURL(
            "https://pixabay.com/users/raphaelsilva-4702998/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=2160923"
          )
        }
      >
        User Image design is by raphaelsilva from Pixabay
      </Caption>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  usersContainer: {
    flexDirection: "row",
  },
  logoButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    borderRadius: 5,
    borderWidth: 1,
    margin: 20,
    fontWeight: "100",
  },
  logoAdd: {
    width: 70,
    height: 70,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.text,
    marginHorizontal: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 250,
    resizeMode: "contain",
  },
  subheading: {
    padding: 25,
    fontSize: 12,
    textAlign: "center",
    color: theme.colors.text,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 10,
    textDecorationLine: "underline",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 5,
  },
});
