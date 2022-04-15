import { Animated } from "react-native";
import { HEADER_HEIGHT } from "../context/initValues";
import { theme } from "../styles/themes";

const GetProps = (scrollY) => {
  const diffClampY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const scrollHeight = diffClampY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  const colorRange = diffClampY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [theme.colors.backgroundopacity, theme.colors.background],
  });

  return { scrollHeight, colorRange };
};

export default GetProps;
