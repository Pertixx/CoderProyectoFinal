import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";

const SeeAllButton = ({ onPress, text, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[{ ...textStyle }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SeeAllButton;

const styles = StyleSheet.create({});
