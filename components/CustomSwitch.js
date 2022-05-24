import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import React, { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

const WIDTH = 50;
const HEIGHT = 25;

const CustomSwitch = ({ label, onPress }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("#fff");
  const [switchColor, setSwitchColor] = useState("#C4C4C4");
  const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    setDisableButton(true);
    if (appTheme.name === "light") {
      moveLeft(() => console.log("do nothing"));
    } else {
      moveRight(() => console.log("do nothing"));
    }
  }, []);

  const moveRight = (callback) => {
    Animated.spring(animatedValue, {
      toValue: { x: WIDTH - HEIGHT + 1, y: 0 },
      bounciness: 15,
      speed: 8,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      callback();
      setDisableButton(false);
    }, 300);
    setIsEnabled(true);
    setSwitchColor(COLORS.orange);
    // setButtonColor("#E6DD3E")
  };

  const moveLeft = (callback) => {
    Animated.spring(animatedValue, {
      toValue: { x: 0, y: 0 },
      bounciness: 15,
      speed: 8,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      callback();
      setDisableButton(false);
    }, 300);
    setIsEnabled(false);
    setSwitchColor("#C4C4C4");
    // setButtonColor("#fff")
  };

  const toggleSwitch = () => {
    setDisableButton(true);
    console.log("toggleSwitch", isEnabled);
    if (!isEnabled) {
      moveRight(onPress);
    } else {
      moveLeft(onPress);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        style={{
          ...FONTS.h3,
          color: appTheme.textColor1,
        }}
      >
        {label}
      </Text>
      <TouchableOpacity
        onPress={toggleSwitch}
        style={styles.container}
        disabled={disableButton}
      >
        <View style={{ backgroundColor: switchColor, ...styles.switch }}>
          <Animated.View style={animatedValue.getLayout()}>
            <TouchableOpacity
              onPress={toggleSwitch}
              style={{ backgroundColor: buttonColor, ...styles.toggleButton }}
              disabled={disableButton}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: SIZES.padding + 5,
  },
  switch: {
    width: WIDTH,
    height: HEIGHT - 6,
    borderRadius: HEIGHT / 2,
    justifyContent: "center",
  },
  toggleButton: {
    height: HEIGHT,
    width: HEIGHT,
    borderRadius: HEIGHT / 2,
    borderColor: "#ccc",
    borderWidth: 1,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
});
