import { COLORS, FONTS, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import BookmarkButton from "./Buttons/BookmarkButton";
import RecipeCardInfo from "./RecipeCardInfo";
import { useSelector } from "react-redux";

const TrendingRecipeCard = ({ recipeItem, navigation }) => {
  const categories = useSelector((state) => state.categories.categories);

  const categoryName =
    categories[categories.findIndex((cat) => cat.id === recipeItem.category)]
      .name;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Recipe", { recipeItem: recipeItem })}
    >
      <Image
        source={recipeItem.image}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.headerContainer}>
        <View style={styles.category}>
          <Text style={{ color: "#fff", ...FONTS.h4 }}>{categoryName}</Text>
        </View>
        <BookmarkButton
          onPress={() => console.log("Bookmark")}
          colorMode="black"
        />
      </View>
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

export default TrendingRecipeCard;

const styles = StyleSheet.create({
  container: {
    height: SIZES.height / 1.8,
    width: SIZES.width / 1.3,
    marginTop: 10,
    marginRight: 20,
    borderRadius: 15,
  },
  image: {
    width: SIZES.width / 1.3,
    height: SIZES.height / 1.8,
    borderRadius: 15,
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
  headerContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    paddingTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
});
