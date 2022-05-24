import { COLORS, FONTS, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { addBookmark, dontAddBookmark } from "../store/actions/user.action";
import { child, get, onValue, ref, update } from "firebase/database";
import { useDispatch, useSelector } from "react-redux";

import BookmarkButton from "./Buttons/BookmarkButton";
import RecipeCardInfo from "./RecipeCardInfo";
import { db } from "../firebase/firebase-config";

const TrendingRecipeCard = ({ recipeItem, navigation, recipeId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const userId = useSelector((state) => state.auth.userId);
  const [categoryName, setCategoryName] = useState(null);
  const bookmarks = useSelector((state) => state.user.bookmarks);
  const add_Bookmark = useSelector((state) => state.user.addBookmark);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (bookmarks.find((id) => id === recipeId)) {
      setActive(true);
    }
    const category =
      categories[categories.findIndex((cat) => cat.id === recipeItem.category)]
        .name;
    setCategoryName(category);
  }, []);

  useEffect(() => {
    if (bookmarks.find((id) => id === recipeId)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [bookmarks]);

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
    dispatch(addBookmark(recipeId));
    //addBookmarkToDb();
  };

  const renderBookmark = () => {
    if (userId !== recipeItem.author.id) {
      return (
        <BookmarkButton
          onPress={handleBookmark}
          colorMode="black"
          active={active}
        />
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("Recipe", {
          recipeItem: recipeItem,
          recipeId: recipeId,
        })
      }
    >
      <Image
        source={{ uri: recipeItem.image }}
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
    height: 40,
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
