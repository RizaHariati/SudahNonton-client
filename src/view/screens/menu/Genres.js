import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Headline } from "react-native-paper";
import { useGlobalContext } from "../../../context/AppContext";
import { globalstyles } from "../../../styles/globalstyles";
import { theme } from "../../../styles/themes";
import GetGenres from "../../../utils/GetGenres";
import Label from "../main/components/Label";

const Genres = ({ navigation }) => {
  const { allShows } = useGlobalContext();
  if (!allShows) {
    <View style={globalstyles.container}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={theme.colors.primary}
      />
    </View>;
  } else {
    const genres = GetGenres(allShows);
    const renderItem = ({ item }) => {
      return <Label item={item} navigation={navigation} />;
    };
    return (
      <View style={styles.container}>
        <Headline style={{ fontSize: 22, marginVertical: 15 }}>Genres</Headline>
        <FlatList
          data={genres}
          keyExtractor={(item, index) => "key" + index}
          renderItem={renderItem}
        />
      </View>
    );
  }
};

export default Genres;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    padding: 15,
  },
  avatar: {
    backgroundColor: theme.colors.backgroundColor,
    color: theme.colors.text,
    marginRight: 15,
  },
  label: {
    flexDirection: "row",
    width: 200,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.primaryOpacity,
    borderRadius: 5,
    elevation: 10,
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
});
