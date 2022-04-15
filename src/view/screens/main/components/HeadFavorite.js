import { StatusBar } from "expo-status-bar";
import React from "react";
import { Animated } from "react-native";
import { HEADER_HEIGHT } from "../../../../context/initValues";
import Headers from "../../../../helpers/Headers";
import TabBar from "../../../../helpers/TabBar";
import { theme } from "../../../../styles/themes";

const HeadFavourite = ({
  onPressLogin,
  onPressSearch,
  onPressAdd,
  onPressWelcome,
  colorRange,
  scrollHeight,
  navigation,
  route,
}) => {
  return (
    <>
      <StatusBar
        style="light"
        backgroundColor={theme.colors.backgroundopacity}
        hidden
      />
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 4,
          elevation: 0,
          top: 0,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          backgroundColor: colorRange,
          transform: [{ translateY: scrollHeight }],
        }}
      >
        <Headers
          onPressSearch={onPressSearch}
          onPressAdd={onPressAdd}
          onPressWelcome={onPressWelcome}
          onPressLogin={onPressLogin}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 4,
          elevation: 1,
          top: HEADER_HEIGHT,
          left: 0,
          right: 0,
          paddingHorizontal: 16,
          backgroundColor: colorRange,
          transform: [{ translateY: scrollHeight }],
        }}
      >
        <TabBar navigation={navigation} route={route} />
      </Animated.View>
    </>
  );
};

export default HeadFavourite;
