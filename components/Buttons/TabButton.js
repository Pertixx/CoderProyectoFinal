import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, SIZES } from "../../constants";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";

import { Feather } from "@expo/vector-icons";

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const animation = useSharedValue({ width: 0, height: 0 });

  const animationStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: 500,
      }),
      height: withTiming(animation.value.height, {
        duration: 400,
      }),
    };
  });

  useEffect(() => {
    if (focused) {
      animation.value = {
        width: SIZES.padding + 20,
        height: SIZES.padding + 20,
      };
    } else {
      animation.value = { width: 0, height: 0 };
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        Platform.OS === "ios" ? { top: SIZES.padding } : null,
      ]} //a partir del iphone x hay que ponerle top
    >
      <View>
        <Animated.View style={[animationStyle, styles.emergingView]} />
        <View style={{ alignItems: "center" }}>
          <Feather
            name={item.iconName}
            size={SIZES.icon}
            color={focused ? COLORS.white : COLORS.gray}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emergingView: {
    backgroundColor: COLORS.black,
    borderRadius: SIZES.padding - 5,
    position: "absolute",
    alignSelf: "center",
    bottom: -5,
  },
});
