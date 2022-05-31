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
import {
  getIngredients,
  getRecipes,
  getTrendingRecipes,
} from "../store/actions/recipe.action";
import { getUserData, setOffline } from "../store/actions/user.action";
import { useDispatch, useSelector } from "react-redux";

import CategoriesCarousel from "../components/CategoriesCarousel";
import Header from "../components/Header";
import Offline from "../components/Offline";
import RecipeCard from "../components/RecipeCard";
import TrendingRecipesCarousel from "../components/TrendingRecipesCarousel";
import i18n from "i18n-js";
import { selectTheme } from "../store/actions/theme.action";

const Home = ({ navigation }) => {
  const data = useSelector((state) => state.recipes.filteredRecipes);
  const userId = useSelector((state) => state.auth.userId);
  const userTheme = useSelector((state) => state.auth.theme);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const [maxRecipesToGet, setMaxRecipesToGet] = useState(20);
  const lastRecipe = useSelector((state) => state.recipes.lastRecipe);
  const isOffline = useSelector((state) => state.recipes.offline);

  useEffect(() => {
    dispatch(selectTheme(userTheme));
    // dispatch(getRecipes(maxRecipesToGet));
    // dispatch(getIngredients());
    dispatch(getUserData(userId));
  }, []);

  const renderItem = (recipe) => {
    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <RecipeCard
          recipeItem={recipe.item}
          navigation={navigation}
          recipeId={recipe.id}
        />
      </View>
    );
  };

  const renderEmptyListMessage = () => {
    if (data.length === 0) {
      return (
        <View style={{ alignItems: "center", marginTop: SIZES.padding }}>
          <Text style={{ ...FONTS.h3, color: COLORS.gray }}>
            {i18n.t("emptyRecipe")}
          </Text>
        </View>
      );
    }
  };

  const fetchData = () => {
    dispatch(getRecipes(maxRecipesToGet));
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleLoadMore = () => {
    setLoading(true);
    dispatch(getRecipes(maxRecipesToGet, lastRecipe));
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const renderLoadMoreButton = () => {
    return (
      <TouchableOpacity
        style={[
          styles.loadMoreButton,
          { backgroundColor: appTheme.loadMoreButton },
        ]}
        onPress={handleLoadMore}
      >
        {loading ? (
          <ActivityIndicator size={"small"} color={COLORS.white} />
        ) : (
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>
            {i18n.t("loadMore")}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  if (isOffline) {
    return <Offline navigation={navigation} />;
  } else {
    return (
      <SafeAreaView
        style={[
          styles.container,
          { backgroundColor: appTheme.backgroundColor1 },
        ]}
      >
        <StatusBar barStyle={appTheme.statusBar} />
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
  }
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: COLORS.white2,
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
