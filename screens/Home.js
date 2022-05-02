import { COLORS, FONTS, SIZES, dummyData } from "../constants/";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CategoriesCarousel from "../components/CategoriesCarousel";
import Header from "../components/Header";
import RecipeCard from "../components/RecipeCard";
import TrendingRecipesCarousel from "../components/TrendingRecipesCarousel";
import { getRecipes } from "../store/actions/recipe.action";

const Home = ({ navigation }) => {
  const data = useSelector((state) => state.recipes.filteredRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, []);

  const renderItem = (item) => {
    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <RecipeCard recipeItem={item} navigation={navigation} />
      </View>
    );
  };

  const renderEmptyListMessage = () => {
    if (data.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
            No hay recetas con la categoria seleccionada
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: SIZES.padding }}>
            <Header navigation={navigation} />
            <TrendingRecipesCarousel navigation={navigation} />
            <CategoriesCarousel showSeeAll={true} />
          </View>
        }
        ListFooterComponent={
          <View>
            {renderEmptyListMessage()}
            <View style={{ marginBottom: SIZES.bottomTabHeight * 2 }} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
});
