import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
import React, { useEffect, useState } from "react";
import {
  confirmRecipe,
  generateImageUrl,
} from "../../store/actions/createRecipe.action";
import { ref, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

import Animated from "react-native-reanimated";
import { db } from "../../firebase/firebase-config";
import { dontAddNewRecipe } from "../../store/actions/user.action";

const CreateRecipeButton = () => {
  const recipe = useSelector((state) => state.createRecipe.recipe);
  const image = useSelector((state) => state.createRecipe.recipe.image);
  const userId = useSelector((state) => state.auth.userId);
  const createdRecipes = useSelector((state) => state.user.createdRecipes);
  const addNewRecipe = useSelector((state) => state.user.addNewRecipe);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (addNewRecipe) {
      addCreatedRecipe();
      dispatch(dontAddNewRecipe());
    }
  }, [addNewRecipe]);

  const addCreatedRecipe = () => {
    update(ref(db, "users/" + userId), {
      createdRecipes: createdRecipes,
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleOnPress = async () => {
    setLoading(true);
    await dispatch(generateImageUrl(userId, image));
    await dispatch(confirmRecipe(recipe));
    setLoading(false);
    //addCreatedRecipe();
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleOnPress}>
      {loading ? (
        <ActivityIndicator size={"small"} color={COLORS.white} />
      ) : (
        <Text style={styles.text}>Crear</Text>
      )}
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
