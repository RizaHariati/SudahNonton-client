import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import { useGlobalContext } from "../context/AppContext";
import { BAR_HEIGHT } from "../context/initValues";
import { theme } from "../styles/themes";

const routes = [
  { id: 0, name: "Favorite", routename: "Bottom" },
  { id: 1, name: "Movies", routename: "Movies" },
  { id: 2, name: "TvShows", routename: "TvShows" },
];

const TabBar = ({ navigation, route }) => {
  const { setBottomSheetIndex } = useGlobalContext();
  return (
    <View style={styles.container}>
      {routes.map((item, index) => {
        const { name, routename } = item;
        let isFocused = name === "Favorite";
        if (route) {
          isFocused = route.name === name;
        }
        return (
          <View
            key={index}
            style={{
              flex: 1,
              width: "100%",
              borderBottomColor: isFocused ? theme.colors.text : null,
              borderBottomWidth: isFocused ? 3 : 0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.6}
              // delayPressIn={0}
              style={styles.button}
              onPress={() => {
                setBottomSheetIndex(-1);
                navigation.navigate(routename);
              }}
            >
              <Text
                style={{
                  textTransform: "uppercase",
                  textAlign: "center",
                  color: isFocused ? theme.colors.light : theme.colors.text,
                }}
              >
                {name}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    height: BAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default TabBar;
