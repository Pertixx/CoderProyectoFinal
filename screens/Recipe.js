import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { addBookmark, dontAddBookmark } from "../store/actions/user.action";
import { child, get, onValue, ref, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

import BookmarkButton from "../components/Buttons/BookmarkButton";
import CreateYourRecipeButton from "../components/Buttons/CreateYourRecipeButton";
import { Feather } from "@expo/vector-icons";
import IngredientCard from "../components/IngredientCard";
import RecipeCreatorCard from "../components/RecipeCreatorCard";
import { db } from "../firebase/firebase-config";

const Recipe = ({ navigation, route }) => {
  const { recipeItem, recipeId } = route.params;
  const scrollY = useSharedValue(0); //similar to new Animated.value(0)
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const add_Bookmark = useSelector((state) => state.user.addBookmark);
  const [active, setActive] = useState(false);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  useEffect(() => {
    if (bookmarks.find((recipe) => recipe.id === recipeId)) {
      setActive(true);
    }
    if (recipeItem.author.id !== userId) {
      updateRecipeViews();
    }
  }, []);

  useEffect(() => {
    if (bookmarks.find((recipe) => recipe.id === recipeId)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [bookmarks]);

  const updateRecipeViews = () => {
    const dbRef = ref(db);
    //const currentViews = ref(db, "recipes/" + recipeId + "/item/views");
    get(child(dbRef, `recipes/${recipeId}/item/views`)).then((snapshot) => {
      const currentViews = snapshot.val();
      update(ref(db, "recipes/" + recipeId + "/item"), {
        views: currentViews + 1,
      }).catch((error) => {
        console.log(error);
      });
    });
  };

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

  useEffect(() => {
    if (add_Bookmark) {
      update(ref(db, "users/" + userId), {
        bookmarks: bookmarks,
      }).catch((error) => {
        console.log(error);
      });
      dispatch(dontAddBookmark());
    }
  }, [add_Bookmark]);

  const handleBookmark = () => {
    dispatch(addBookmark(recipeId, recipeItem));
    //addBookmarkToDb();
  };

  const renderBookmarkButton = () => {
    if (userId !== recipeItem.author.id) {
      return (
        <BookmarkButton
          onPress={handleBookmark}
          colorMode="white"
          active={active}
        />
      );
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={SIZES.icon} color={COLORS.black} />
        </TouchableOpacity>
        {renderBookmarkButton()}
      </View>
    );
  };

  const renderRecipeHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Animated.Image
          source={{ uri: recipeItem.image }}
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
            author={recipeItem.author}
            recipeDescription={recipeItem.description}
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
        <Text style={[styles.ingredientsTitle, { color: appTheme.textColor1 }]}>
          {recipeItem.name}
        </Text>
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
    <View
      style={[styles.container, { backgroundColor: appTheme.backgroundColor1 }]}
    >
      <Animated.FlatList
        data={recipeItem.ingredients}
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
