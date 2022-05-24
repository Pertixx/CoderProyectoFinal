import { COLORS, FONTS, dummyData } from "../constants";
import { FlatList, StyleSheet, Text, View } from "react-native";

import React from "react";
import SeeAllButton from "./Buttons/SeeAllButton";
import TrendingRecipeCard from "./TrendingRecipeCard";
import { useSelector } from "react-redux";

const TrendingRecipesCarousel = ({ navigation }) => {
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const data = useSelector((state) => state.recipes.trendingRecipes);

  return (
    <View style={styles.trendingContainer}>
      <View style={styles.titleContainer}>
        <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
          Mas Populares
        </Text>
        {/* <SeeAllButton
          text="Ver todas"
          onPress={() => console.log("Navegar a otra screen")}
          textStyle={styles.textButton}
        /> */}
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <View>
              <TrendingRecipeCard
                recipeItem={item.item}
                navigation={navigation}
                recipeId={item.id}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default TrendingRecipesCarousel;

const styles = StyleSheet.create({
  trendingContainer: {
    marginTop: 15,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textButton: {
    color: COLORS.orange,
    ...FONTS.bodyBold,
  },
});
