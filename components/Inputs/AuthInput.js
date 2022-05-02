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

import { AntDesign } from "@expo/vector-icons";
import { checkForm } from "../../store/actions/auth.action";

const AuthInput = ({
  type = "default",
  secure = false,
  value,
  onChange,
  listenTo = true,
}) => {
  const [borderColor, setBorderColor] = useState(COLORS.gray);
  const dispatch = useDispatch();
  const notValid = useSelector((state) => state.auth.formValid);
  const animation = useSharedValue({ width: "100%" });
  const warningAnimation = useSharedValue({ opacity: 0 });
  const animationStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(animation.value.width, {
        duration: 1000,
      }),
    };
  });
  const warningAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(warningAnimation.value.opacity, {
        duration: 1000,
      }),
    };
  });

  const onBlurHandler = () => {
    console.log(value);
    setBorderColor(COLORS.gray);
    if (!listenTo) {
      animation.value = { width: "90%" };
      warningAnimation.value = { opacity: 1 };
    } else {
      warningAnimation.value = { opacity: 0 };
      animation.value = { width: "100%" };
    }
  };

  const handleOnChange = (text) => {
    dispatch(onChange(text));
    dispatch(checkForm());
  };

  const renderWarning = () => {
    return (
      <Animated.View style={[warningAnimationStyle, styles.warningContainer]}>
        <AntDesign
          name="exclamation"
          size={SIZES.icon + 5}
          color={COLORS.darkOrange}
        />
      </Animated.View>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Animated.View style={[animationStyle]}>
        <TextInput
          style={[styles.input, { borderColor: borderColor }]}
          keyboardType={type}
          secureTextEntry={secure}
          onFocus={() => setBorderColor(COLORS.orange)}
          onBlur={onBlurHandler}
          autoCapitalize="none"
          value={value}
          onChangeText={(text) => handleOnChange(text)}
          placeholderTextColor={COLORS.gray}
        />
      </Animated.View>
      {renderWarning()}
    </View>
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
  },
  warningContainer: {
    width: SIZES.icon + 10,
    height: SIZES.icon + 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
