import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, SIZES, dummyData } from "../constants";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Offline from "../components/Offline";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import { getSearchedRecipes } from "../store/actions/recipe.action";

const Search = ({ navigation }) => {
  const data = useSelector((state) => state.recipes.searchedRecipes);
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const isOffline = useSelector((state) => state.recipes.offline);

  const scrollY = useSharedValue(0); //similar to new Animated.value(0)

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const inputRange = [0, SIZES.padding * 12];
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [1, 0],
        Extrapolate.CLAMP
      ),
      transform: [{ translateX: scrollY.value }],
    };
  });

  const renderItem = (recipe) => {
    return (
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <RecipeCard
          recipeItem={recipe.item}
          recipeId={recipe.id}
          navigation={navigation}
        />
      </View>
    );
  };

  const handleSearch = () => {
    if (text !== "") {
      dispatch(getSearchedRecipes(text));
    }
  };

  const renderHeader = () => {
    return (
      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <SearchBar
          handleSearch={handleSearch}
          text={text}
          onChangeText={setText}
        />
      </Animated.View>
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
        <Animated.FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View style={{ marginBottom: SIZES.bottomTabHeight * 2 }} />
          }
          ListHeaderComponent={
            <View style={{ paddingHorizontal: SIZES.padding }}>
              {renderHeader()}
            </View>
          }
          onScroll={onScroll}
          scrollEventThrottle={16}
          bounces={false}
        />
      </SafeAreaView>
    );
  }
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
  headerContainer: {
    overflow: "hidden",
    marginBottom: SIZES.padding * 2,
  },
});
