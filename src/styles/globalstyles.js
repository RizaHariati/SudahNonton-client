import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import { theme } from "./themes";
import { windowHeight } from "../context/initValues";
export const globalstyles = StyleSheet.create({
  container: {
    // paddingTop: Constants.statusBarHeight,
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  rowContainer: {
    width: "100%",
    height: 240,
  },
  rowSubContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: windowHeight * 0.67,
    marginBottom: 10,
    zIndex: 0,
  },
  image: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: windowHeight * 0.67,
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 175,
    resizeMode: "cover",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  smallText: {
    fontSize: 12,
  },
  bottomBackgroundStyle: {
    backgroundColor: theme.colors.backgroundopacitydark,
  },
  handleStyle: {
    backgroundColor: theme.colors.backgroundopacitydark,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
