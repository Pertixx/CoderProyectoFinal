import { COLORS, SHADOW } from "../../constants";
import { StyleSheet, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React from "react";

const BookmarkButton = ({ onPress, colorMode, active }) => {
  if (colorMode === "black") {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={styles.container}
      >
        {active ? (
          <AntDesign name="heart" size={24} color={COLORS.orange} />
        ) : (
          <Feather name="heart" size={24} color={COLORS.white} />
        )}
      </TouchableOpacity>
    );
  } else if (colorMode === "white") {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
        }}
        style={[styles.container, { backgroundColor: COLORS.white }]}
      >
        {active ? (
          <AntDesign name="heart" size={24} color={COLORS.orange} />
        ) : (
          <Feather name="heart" size={24} color={COLORS.black} />
        )}
      </TouchableOpacity>
    );
  }
};

export default BookmarkButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    ...SHADOW.shadow1,
  },
});
