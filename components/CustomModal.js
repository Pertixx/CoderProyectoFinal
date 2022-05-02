import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { COLORS, SIZES } from "../constants";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import React from "react";

const CustomModal = ({ sharedValue1, sharedValue2 }) => {
  const modalMainContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sharedValue1.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: sharedValue1.value,
        },
      ],
    };
  });

  const modalBackgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sharedValue2.value, [SIZES.height, 0], [0, 1]),
    };
  });

  const modalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(sharedValue2.value, [SIZES.height, 0], [0, 1]),
      transform: [
        {
          translateY: sharedValue2.value,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[styles.mainContainer, modalMainContainerAnimatedStyle]}
    >
      <Animated.View
        style={[styles.backgroundContainer, modalBackgroundAnimatedStyle]}
      >
        <Animated.View
          style={[styles.contentContainer, modalContentAnimatedStyle]}
        >
          <View
            style={{
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                sharedValue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });
                sharedValue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, { duration: 500 })
                );
              }}
            >
              <AntDesign name="close" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    bottom: 0,
    height: SIZES.height,
    width: SIZES.width,
  },
  backgroundContainer: {
    flex: 1,
    height: SIZES.height,
    width: SIZES.width,
    backgroundColor: COLORS.transparentBlack7,
  },
  contentContainer: {
    position: "absolute",
    bottom: 0,
    height: SIZES.height * 0.9,
    width: SIZES.width,
    borderTopLeftRadius: SIZES.padding * 2,
    borderTopRightRadius: SIZES.padding * 2,
    backgroundColor: COLORS.white,
  },
});
