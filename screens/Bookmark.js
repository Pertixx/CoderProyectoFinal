import { COLORS, FONTS } from "../constants";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipeCard from "../components/RecipeCard";

const Bookmark = ({ navigation }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const bookmarks = useSelector((state) => state.user.bookmarks);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      console.log("FOCUSED BOOKMARKS");
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = (recipe) => {
    if (bookmarks[0] === 0) {
      return (
        <Text style={{ ...FONTS.h3, color: appTheme.textColor1 }}>
          NO HAY RECETAS FAVORITAS
        </Text>
      );
    }
    return (
      <RecipeCard
        navigation={navigation}
        recipeId={recipe.id}
        recipeItem={recipe.recipe}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: appTheme.backgroundColor1 }]}
    >
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => renderItem(item)}
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
