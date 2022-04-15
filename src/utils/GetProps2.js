import { Animated } from "react-native";
import { MAIN_HEADER } from "../context/initValues";
import { theme } from "../styles/themes";

const GetProps2 = (scrollY) => {
  const diffClampY = Animated.diffClamp(scrollY, 0, MAIN_HEADER);

  const colorRange = diffClampY.interpolate({
    inputRange: [0, MAIN_HEADER],
    outputRange: [theme.colors.backgroundopacity, theme.colors.background],
  });
  const translateY = diffClampY.interpolate({
    inputRange: [0, MAIN_HEADER],
    outputRange: [0, -MAIN_HEADER],
  });
  return { colorRange, translateY };
};

export default GetProps2;
