import { COLORS, FONTS, SIZES } from "../../constants";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Animated from "react-native-reanimated";
import React from "react";
import { confirmRecipe } from "../../store/actions/createRecipe.action";

const CreateRecipeButton = () => {
  const recipe = useSelector((state) => state.createRecipe.recipe);
  const dispatch = useDispatch();
  const handleOnPress = () => {
    dispatch(confirmRecipe(recipe));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      <Text style={styles.text}>Crear</Text>
    </TouchableOpacity>
  );
};

export default CreateRecipeButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.black,
    //width: "100%",
    height: 50,
    position: "absolute",
    bottom:
      Platform.OS === "ios"
        ? SIZES.bottomTabHeight * 2
        : SIZES.bottomTabHeight * 1.5,
    alignItems: "center",
    justifyContent: "center",
    right: SIZES.padding,
    left: SIZES.padding,
    borderRadius: SIZES.padding + 5,
  },
  text: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});
