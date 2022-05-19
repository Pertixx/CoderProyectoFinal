import { COLORS, FONTS, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import BookmarkButton from "./Buttons/BookmarkButton";
import RecipeCardInfo from "./RecipeCardInfo";
import { useSelector } from "react-redux";

const TrendingRecipeCard = ({ recipeItem, navigation }) => {
  const categories = useSelector((state) => state.categories.categories);
  const userId = useSelector((state) => state.auth.userId);
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    const category =
      categories[categories.findIndex((cat) => cat.id === recipeItem.category)]
        .name;
    setCategoryName(category);
  }, []);

  const renderBookmark = () => {
    if (userId !== recipeItem.author.id) {
      return (
        <BookmarkButton
          onPress={() => console.log("Bookmark")}
          colorMode="black"
        />
      );
    }
  };

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
        {renderBookmark()}
      </View>
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

export default TrendingRecipeCard;

const styles = StyleSheet.create({
  container: {
    height: SIZES.height * 0.6,
    width: SIZES.width * 0.8,
    marginTop: SIZES.padding - 5,
    marginRight: SIZES.padding + 5,
    borderRadius: SIZES.padding,
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.height * 0.6,
    borderRadius: SIZES.padding,
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
