import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, FONTS, SIZES } from "../constants";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { setInactive } from "../store/actions/toaster.action";

const HIDDEN_POSITION = 150;
const VISIBLE_POSITION = -SIZES.bottomTabHeight;

const Toaster = () => {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.toaster.visible);
  const text = useSelector((state) => state.toaster.toasterText);
  const animation = useSharedValue(HIDDEN_POSITION);

  useEffect(() => {
    if (visible) {
      animation.value = VISIBLE_POSITION;
      setTimeout(() => {
        animation.value = HIDDEN_POSITION;
      }, 3000);
      dispatch(setInactive());
    }
  }, [visible]);

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(animation.value, {
            duration: 1500,
          }),
        },
      ],
    };
  });

  return (
    <View>
      <Animated.View style={[styles.container, animationStyle]}>
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    </View>
  );
};

export default Toaster;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black3,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: SIZES.bottomTabHeight,
    borderRadius: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.black2,
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});
