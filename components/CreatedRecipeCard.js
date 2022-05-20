import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Feather } from "@expo/vector-icons";
import RecipeCardInfo from "./RecipeCardInfo";
import { deleteCreatedRecipe } from "../store/actions/recipe.action";

const CreatedRecipeCard = ({ recipe }) => {
  const [categoryName, setCategoryName] = useState(null);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const category =
      categories[categories.findIndex((cat) => cat.id === recipe.category)]
        .name;
    setCategoryName(category);
  }, []);

  const handleOnPress = () => {
    dispatch(deleteCreatedRecipe(recipe.id));
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: recipe.image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.categoryContainer}>
        <View style={styles.category}>
          <Text style={{ color: "#fff", ...FONTS.h4 }}>{categoryName}</Text>
        </View>
        <TouchableOpacity onPress={handleOnPress} style={styles.trash}>
          <Feather name="trash-2" size={SIZES.icon} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <RecipeCardInfo recipeItem={recipe} />
    </View>
  );
};

export default CreatedRecipeCard;

const styles = StyleSheet.create({
  container: {
    marginRight: SIZES.padding,
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.4,
  },
  image: {
    flex: 1,
    borderRadius: SIZES.padding,
  },
  categoryContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  category: {
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 1,
    borderRadius: 8,
    width: "50%",
    height: "100%",
  },
  trash: {
    width: SIZES.icon + 15,
    height: SIZES.icon + 15,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.padding - 8,
  },
});
