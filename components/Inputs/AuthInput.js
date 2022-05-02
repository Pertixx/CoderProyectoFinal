import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, SIZES } from "../../constants";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { checkForm } from "../../store/actions/auth.action";

const AuthInput = ({ type = "default", secure = false, value, onChange }) => {
  const [borderColor, setBorderColor] = useState(COLORS.gray);
  const dispatch = useDispatch();
  const notValid = useSelector((state) => state.auth.formValid);
  const animation = useSharedValue({ width: "100%" });
  const animationStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: 1000,
      }),
    };
  });

  const onBlurHandler = () => {
    dispatch(checkForm());
    setBorderColor(COLORS.gray);
  };

  return (
    <Animated.View style={[animationStyle]}>
      <TouchableOpacity
        onPress={() => {
          animation.value = { width: "90%" };
        }}
      >
        <Text style={{ color: "white" }}>APRETAAAAAAAAA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          animation.value = { width: "100%" };
        }}
      >
        <Text style={{ color: "white" }}>APRETAAAAAAAAA</Text>
      </TouchableOpacity>
      <TextInput
        style={[styles.input, { borderColor: borderColor }]}
        keyboardType={type}
        secureTextEntry={secure}
        onFocus={() => setBorderColor(COLORS.orange)}
        onBlur={onBlurHandler}
        autoCapitalize="none"
        value={value}
        onChangeText={(text) => dispatch(onChange(text))}
        placeholderTextColor={COLORS.gray}
      />
    </Animated.View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  input: {
    height: SIZES.height * 0.07,
    backgroundColor: COLORS.black3,
    padding: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.padding - 5,
    color: COLORS.white,
    alignItems: "center",
    //width: "90%",
  },
});
