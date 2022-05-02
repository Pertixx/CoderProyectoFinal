import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, FONTS, SHADOW, SIZES, dummyData, images } from "../constants";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BookmarkButton from "../components/Buttons/BookmarkButton";
import CreateYourRecipeButton from "../components/Buttons/CreateYourRecipeButton";
import { Feather } from "@expo/vector-icons";
import IngredientCard from "../components/IngredientCard";
import React from "react";
import RecipeCreatorCard from "../components/RecipeCreatorCard";

const Recipe = ({ navigation, route }) => {
  const { recipeItem } = route.params;
  const scrollY = useSharedValue(0); //similar to new Animated.value(0)

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });
  const inputRange = [0, SIZES.height / 5];
  const creatorCardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
    };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [SIZES.height / 10, SIZES.height / 3.5],
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  const createButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        inputRange,
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const renderHeader = () => {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={SIZES.icon} color={COLORS.black} />
        </TouchableOpacity>
        <BookmarkButton
          onPress={() => console.log("Bookmark")}
          colorMode="white"
        />
      </View>
    );
  };

  const renderRecipeHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Animated.Image
          source={images.spagetti}
          style={[styles.image, imageAnimatedStyle]}
          blurRadius={0}
        />
        <Animated.View
          style={[
            styles.creatorCard,
            creatorCardAnimatedStyle,
            recipeItem.description != null
              ? { top: SIZES.height / 5, height: SIZES.height * 0.19 }
              : { top: SIZES.height / 4, height: SIZES.height * 0.14 },
          ]}
        >
          <RecipeCreatorCard
            author={recipeItem.item.author}
            recipeDescription={recipeItem.item.description}
          />
        </Animated.View>
      </View>
    );
  };

  const renderIngredientsTitle = () => {
    return (
      <View style={styles.ingredientsTitleContainer}>
        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.gray,
          }}
        >
          Ingredientes de:
        </Text>
        <Text style={styles.ingredientsTitle}>{recipeItem.item.name}</Text>
      </View>
    );
  };

  const renderCreateRecipe = () => {
    return (
      <Animated.View
        style={[styles.createRecipeButton, createButtonAnimatedStyle]}
      >
        <CreateYourRecipeButton navigation={navigation} />
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={recipeItem.item.ingredients}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
              <IngredientCard ingredient={item} />
            </View>
          );
        }}
        ListHeaderComponent={
          <View>
            {renderRecipeHeader()}
            {renderIngredientsTitle()}
          </View>
        }
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
        onScroll={onScroll}
        scrollEventThrottle={16}
        bounces={false}
      />
      {renderHeader()}
      {renderCreateRecipe()}
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    borderRadius: 12,
    ...SHADOW.shadow1,
    backgroundColor: COLORS.white,
  },
  image: {
    height: SIZES.height / 2.5,
    width: "100%",
  },
  headerContainer: {
    alignItems: "center",
    overflow: "hidden",
    marginBottom: SIZES.padding + 5,
    backgroundColor: COLORS.black,
  },
  backButtonContainer: {
    flex: 1,
    position: "absolute",
    top: Platform.OS === "ios" ? SIZES.padding * 3.5 : SIZES.padding,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
  },
  creatorCard: {
    position: "absolute",
    //top: SIZES.height / 5,
    width: "90%",
    //height: SIZES.height * 0.19,
    borderRadius: SIZES.padding - 5,
    alignItems: "center",
  },
  ingredientsTitleContainer: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  ingredientsTitle: {
    ...FONTS.h2,
  },
  createRecipeButton: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? SIZES.padding * 3 : SIZES.padding,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.height * 0.13,
    height: SIZES.height * 0.07,
  },
});
