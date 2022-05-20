import { COLORS, FONTS, SIZES } from "../../constants";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { filterRecipes } from "../../store/actions/recipe.action";
import { selectCategory } from "../../store/actions/category.action";

const CategoryButton = ({ item }) => {
  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state) => state.categories.selectedCategories
  );
  const [selected, setSelected] = useState(false);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(selectCategory(item.id));
        dispatch(filterRecipes(selectedCategories));
        setSelected(!selected);
      }}
      style={[
        styles.categoryButton,
        selected
          ? { backgroundColor: COLORS.orange, borderWidth: 0 }
          : { backgroundColor: appTheme.categoryButtonColor },
      ]}
    >
      <Text
        style={[styles.buttonText, selected ? { color: COLORS.white } : null]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  categoryButton: {
    width: 100,
    height: 40,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.padding + 5,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  buttonText: {
    ...FONTS.bodyBold,
    color: COLORS.black,
  },
});
