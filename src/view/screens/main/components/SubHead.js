import React from "react";
import { Animated } from "react-native";
import { MAIN_HEADER } from "../../../../context/initValues";
import HeaderSmall from "../../../../helpers/HeadersSmall";
import TabBar from "../../../../helpers/TabBar";

const SubHead = ({
  onPressSearch,
  onPressAdd,
  onPressBack,
  translateY,
  colorRange,
  navigation,
  route,
}) => {
  return (
    <>
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
          transform: [{ translateY: translateY }],
        }}
      >
        <HeaderSmall
          title={route.name}
          onPressSearch={onPressSearch}
          onPressAdd={onPressAdd}
          onPressBack={onPressBack}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          zIndex: 4,
          elevation: 1,
          top: MAIN_HEADER,
          left: 0,
          right: 0,
          backgroundColor: colorRange,
          transform: [{ translateY: translateY }],
        }}
      >
        <TabBar navigation={navigation} route={route} />
      </Animated.View>
    </>
  );
};

export default SubHead;
