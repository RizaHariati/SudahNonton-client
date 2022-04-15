import React from "react";
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Caption, Headline, Subheading, Text, Title } from "react-native-paper";
import { globalstyles } from "../../../styles/globalstyles";
import TmdbLogo from "../../../../assets/svg/TmdbLogo.svg";
import { theme } from "../../../styles/themes";
const About = ({ navigation }) => {
  return (
    <View style={globalstyles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Headline style={styles.text}>About</Headline>
          <Text style={styles.subheading}>
            <Image
              source={require("../../../../assets/TitleLogo.png")}
              style={styles.logoImage}
            />
            is created by Riza Hariati for AzriCoding, as a web development
            study. The web design is based on Netflix. Using Laravel 8 as back
            end and React Native for front end. Please check out my portfolio
            <Text
              style={styles.linkBig}
              onPress={() =>
                Linking.openURL(" https://rizahariati.netlify.app/")
              }
            >
              Riza Hariati
            </Text>
            &nbsp; to see my other projects.
          </Text>
        </View>
        <View style={styles.usersContainer}>
          <TouchableOpacity
            style={styles.logoButton}
            onPress={() => Linking.openURL("https://rizahariati.netlify.app/")}
          >
            <Image
              source={require("../../../../assets/azrilogo.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Title>AzriCoding</Title>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
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
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  usersContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    textAlign: "center",
    width: "100%",
    marginTop: 30,
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

  logoImage: {
    width: 150,
    height: 20,
    resizeMode: "contain",
  },
  subheading: {
    paddingHorizontal: 25,
    fontSize: 14,
    color: theme.colors.text,
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    flex: 1,
  },
  link: {
    color: theme.colors.primary,
    fontSize: 10,
    textDecorationLine: "underline",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    borderRadius: 70,
    // elevation: 2,
  },
  linkBig: {
    color: theme.colors.primary,
    fontSize: 14,
    textDecorationLine: "underline",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
});
