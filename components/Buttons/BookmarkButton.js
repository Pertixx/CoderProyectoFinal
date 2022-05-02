import { COLORS, SHADOW } from "../../constants";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const BookmarkButton = ({ onPress, colorMode }) => {
  const [selected, setSelected] = useState(false);

  if (colorMode === "black") {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          setSelected(!selected);
        }}
        style={styles.container}
      >
        {selected ? (
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
          setSelected(!selected);
        }}
        style={[styles.container, { backgroundColor: COLORS.white }]}
      >
        {selected ? (
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
