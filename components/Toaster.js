import { StyleSheet, Text, View } from "react-native";

import Animated from "react-native-reanimated";
import { COLORS } from "../constants";
import React from "react";

const HIDDEN_POSITION = -50;
const VISIBLE_POSITION = 50;

const Toaster = ({ text }) => {
  return (
    <Animated.View style={[styles.container]}>
      <Text>{text}</Text>
    </Animated.View>
  );
};

export default Toaster;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
});
