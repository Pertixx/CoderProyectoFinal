import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/";
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
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const fetchData = () => {
    dispatch(getRecipes());
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const renderLoadMoreButton = () => {
    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={COLORS.white} />
        ) : (
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Cargar Mas</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
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
          <View style={{ paddingHorizontal: SIZES.padding }}>
            {renderEmptyListMessage()}
            {renderLoadMoreButton()}
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
  loadMoreButton: {
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    height: SIZES.bottomTabHeight,
    borderRadius: SIZES.padding + 5,
    marginTop: SIZES.padding * 2,
  },
});
