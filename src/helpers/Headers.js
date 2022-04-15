import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Surface, Text, TextInput } from "react-native-paper";
import { theme } from "../styles/themes";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../context/AppContext";
const Headers = ({
  onPressSearch,
  onPressAdd,
  onPressWelcome,
  onPressLogin,
}) => {
  const { isLogin, getLogout } = useGlobalContext();
  const handleLogout = () => {
    Alert.alert("Alert", "Are you sure you want to Log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => getLogout(), style: "destructive" },
    ]);
  };
  return (
    <Surface style={styles.header}>
      <TouchableOpacity onPress={() => onPressWelcome()}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ height: 50, width: 50, borderRadius: 5 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => onPressSearch()}>
          <Ionicons name="search-outline" size={30} color={theme.colors.text} />
        </TouchableOpacity>
        {isLogin ? (
          <>
            <TouchableOpacity
              activeOpacity={0.4}
              delayPressIn={100}
              onPress={() => onPressAdd()}
              style={styles.button}
            >
              <Ionicons name="add" size={25} color={theme.colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              delayPressIn={100}
              onPress={() => {
                handleLogout();
              }}
              style={styles.button2}
            >
              <Ionicons
                name="log-out-outline"
                size={40}
                color={theme.colors.text}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            activeOpacity={0.4}
            delayPressIn={100}
            onPress={() => onPressLogin()}
            style={styles.button2}
          >
            <Ionicons
              name="log-in-outline"
              size={40}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
    </Surface>
  );
};

export default Headers;

const styles = StyleSheet.create({
  header: {
    height: 70,
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
    width: 30,
    height: 30,
    borderRadius: 5,
    borderColor: theme.colors.text,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  button2: {
    marginLeft: 5,
    // width: 40,
    // height: 40,
    // borderRadius: 5,
    borderColor: theme.colors.text,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
