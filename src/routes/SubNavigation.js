import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Easing } from "react-native";
import { theme } from "../styles/themes";
import Favorite from "../view/screens/main/Favorite";
import Movies from "../view/screens/main/Movies";
import TvShows from "../view/screens/main/TvShows";

const SubStack = createStackNavigator();

const config = {
  animation: "timing",
  config: {
    stiffness: 100,
    damping: 400,
    mass: 1,
    overshootClamping: false,
    restDisplacementTreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 400,
    easing: Easing.ease,
  },
};

const SubNavigation = () => {
  return (
    <SubStack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        gestureDirection: "horizontal",
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        headerTintColor: theme.colors.light,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <SubStack.Screen name="Bottom" component={Favorite} />
      <SubStack.Screen name="Movies" component={Movies} />
      <SubStack.Screen name="TvShows" component={TvShows} />
    </SubStack.Navigator>
  );
};

export default SubNavigation;
