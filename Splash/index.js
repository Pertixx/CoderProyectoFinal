import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../constants";
import LottieView from "lottie-react-native";
import React from "react";

const SplashScreen = ({ onFinish }) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/animations/splashAnimation.json")}
        autoPlay
        speed={2}
        loop={false}
        onAnimationFinish={() => onFinish(false)}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
});
