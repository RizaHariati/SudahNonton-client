import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Easing } from "react-native";
import Welcome from "../view/Welcome";
import { BottomNavigation } from "./TabBottom";
import Search from "../view/screens/main/Search";
import { theme } from "../styles/themes";
import { useGlobalContext } from "../context/AppContext";
import Login from "../view/screens/main/Login";
import Create from "../view/screens/main/Crud/Create";
import Genre from "../view/screens/menu/Genre";
import SingleShow from "../view/screens/main/SingleShow";
import Add from "../view/screens/main/Crud/Add";

const MainStack = createStackNavigator();

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

const Navigations = () => {
  const { isLogin } = useGlobalContext();
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
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
      <MainStack.Screen name="Welcome" component={Welcome} />
      <MainStack.Screen name="Bottom" component={BottomNavigation} />
      <MainStack.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: true,
          headerTitle: "Add a New Show",
        }}
      />
      <MainStack.Screen
        name="Create"
        component={Create}
        options={{
          headerShown: true,
        }}
      />
      <MainStack.Screen
        name="Genre"
        component={Genre}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params.genre,
        })}
      />
      <MainStack.Screen
        name="SingleShow"
        component={SingleShow}
        options={{
          headerShown: true,
        }}
      />
    </MainStack.Navigator>
  );
};

export default Navigations;
