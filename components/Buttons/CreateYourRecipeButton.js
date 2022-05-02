import { COLORS, FONTS, SIZES } from "../../constants/";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import React from "react";

const CreateYourRecipeButton = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crea tu receta</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateRecipe")}
        style={styles.button}
      >
        <Feather name="arrow-right" size={SIZES.icon} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default CreateYourRecipeButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: SIZES.padding,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: SIZES.padding - 5,
    backgroundColor: COLORS.black3,
    alignItems: "center",
    justifyContent: "center",
  },
});
