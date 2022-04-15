import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Avatar, Subheading } from "react-native-paper";
import { theme } from "../../../../styles/themes";

const Label = ({ item, navigation }) => {
  if (!item) return;
  else {
    return (
      <TouchableOpacity
        style={styles.label}
        onPress={() => {
          navigation.navigate("Genre", { genre: item });
        }}
      >
        <Avatar.Text
          size={30}
          label={item.slice(0, 2)}
          color="white"
          style={styles.avatar}
        />
        <Subheading>{item}</Subheading>
      </TouchableOpacity>
    );
  }
};

export default Label;

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: theme.colors.backgroundColor,
    color: theme.colors.text,
    marginRight: 15,
  },
  label: {
    flexDirection: "row",
    width: 240,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.primaryOpacity,
    borderRadius: 5,
    elevation: 10,
    marginBottom: 5,
    marginHorizontal: 15,
    paddingVertical: 3,
    paddingHorizontal: 15,
  },
});
