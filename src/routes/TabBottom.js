import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../styles/themes";
import SubNavigation from "./SubNavigation";
import Genres from "../view/screens/menu/Genres";
import WatchList from "../view/screens/menu/WatchList";
import About from "../view/screens/menu/About";

const TabBottom = createBottomTabNavigator();
export const BottomNavigation = () => {
  return (
    <TabBottom.Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.text,
        inactiveTintColor: theme.colors.primary,
        showLabel: true,
        style: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.primaryOpacity,
          borderTopWidth: 1,
          elevation: 2,
          height: 55,
          padding: 2,
        },
      }}
    >
      <TabBottom.Screen
        name="Home"
        component={SubNavigation}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" color={color} size={26} />
          ),
        }}
      />

      <TabBottom.Screen
        name="WatchList"
        component={WatchList}
        options={{
          title: "Watch List",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-outline" color={color} size={26} />
          ),
        }}
      />

      <TabBottom.Screen
        name="Genres"
        component={Genres}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="grid-outline" color={color} size={26} />
          ),
        }}
      />

      <TabBottom.Screen
        name="About"
        component={About}
        options={{
          title: "About Me",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color={color} size={26} />
          ),
        }}
      />
    </TabBottom.Navigator>
  );
};
