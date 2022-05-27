import { COLORS, FONTS, SIZES } from "../constants";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreateYourRecipeButton from "../components/Buttons/CreateYourRecipeButton";
import { Feather } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";
import i18n from "i18n-js";

const Bookmark = ({ navigation }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const bookmarks = useSelector((state) => state.user.bookmarks);

  const renderItem = (recipe) => {
    if (bookmarks[0] !== 0) {
      return (
        <View style={{ paddingHorizontal: SIZES.padding }}>
          <RecipeCard
            navigation={navigation}
            recipeId={recipe.id}
            recipeItem={recipe.recipe}
          />
        </View>
      );
    }
  };

  const renderVisitRecipes = () => {
    if (bookmarks[0] === 0) {
      return (
        <View
          style={{
            //paddingHorizontal: SIZES.padding,
            width: "50%",
            height: SIZES.height * 0.07,
            marginTop: SIZES.height * 0.25,
          }}
        >
          <CreateYourRecipeButton
            navigation={navigation}
            label={i18n.t("exploreRecipes")}
            destination={"Home"}
          />
        </View>
      );
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
          {i18n.t("markedRecipes")}
        </Text>
      </View>
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
        ListHeaderComponent={<View>{renderHeader()}</View>}
        ListFooterComponent={
          <View style={{ alignItems: "center" }}>
            {renderVisitRecipes()}
            <View style={{ marginBottom: SIZES.bottomTabHeight * 2 }} />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: SIZES.padding * 4,
    marginBottom: SIZES.padding * 2,
    alignItems: "center",
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: SIZES.padding - 5,
    backgroundColor: COLORS.black3,
    alignItems: "center",
    justifyContent: "center",
  },
});
