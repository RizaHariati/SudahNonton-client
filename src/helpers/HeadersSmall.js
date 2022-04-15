import React from "react";
import {
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Headline, Surface, Text, TextInput, Title } from "react-native-paper";
import { theme } from "../styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { MAIN_HEADER } from "../context/initValues";
import { useGlobalContext } from "../context/AppContext";
const HeaderSmall = ({ title, onPressSearch, onPressBack }) => {
  const { setBottomSheetIndex } = useGlobalContext();
  return (
    <Surface style={styles.header}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() => {
            onPressBack();
            setBottomSheetIndex(-1);
          }}
        >
          <Ionicons
            name="arrow-back-outline"
            size={30}
            color={theme.colors.light}
          />
        </TouchableOpacity>
        <Title style={{ color: theme.colors.light }}>{title}</Title>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onPressSearch()}>
          <Ionicons
            name="md-search-outline"
            size={30}
            color={theme.colors.light}
          />
        </TouchableOpacity>
      </View>
    </Surface>
  );
};

export default HeaderSmall;

const styles = StyleSheet.create({
  header: {
    height: MAIN_HEADER,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  view: {
    marginHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
  },
  titleView: {
    flex: 1,
  },
  rightView: {
    justifyContent: "flex-end",
    width: "70%",
    marginRight: 10,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  button: {
    marginLeft: 15,
    width: 34,
    height: 34,
    borderRadius: 5,
    borderColor: theme.colors.light,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
