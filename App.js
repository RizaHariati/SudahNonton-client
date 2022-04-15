import "react-native-gesture-handler";
import React from "react";
import Navigations from "./src/routes/Navigations";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import { theme } from "./src/styles/themes";
import { StatusBar } from "react-native";
import { AppProvider } from "./src/context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <StatusBar />
          <Navigations />
        </NavigationContainer>
      </PaperProvider>
    </AppProvider>
  );
};

export default App;
