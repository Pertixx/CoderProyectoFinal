import { COLORS, FONTS, SIZES } from "../../constants";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const CustomButton = ({ onPress, colors, text, buttonStyle }) => {
  if (colors.length > 0) {
    return (
      <TouchableOpacity
        onPress={onPress}
        //style={styles.button}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors}
          style={buttonStyle}
        >
          <Text style={styles.text}>{text}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    );
  }
};

CustomButton.defaultProps = {
  colors: [],
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
  },
  gradient: {
    height: "50%",
    borderRadius: 20,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h3,
    textAlign: "center",
  },
});
