import { COLORS, FONTS, SIZES } from "../constants";
import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";

const IngredientCard = ({ ingredient }) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <View style={styles.imageContainer}>
          <Image source={ingredient.icon} style={{ width: 30, height: 30 }} />
        </View>
        <Text style={styles.ingredientName} numberOfLines={2}>
          {ingredient.name}
        </Text>
      </View>
      <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
    </View>
  );
};

export default IngredientCard;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.gray3,
    marginBottom: SIZES.padding,
    height: SIZES.height * 0.09,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: SIZES.padding - 5,
    borderRadius: SIZES.padding - 7,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-between",
  },
  imageContainer: {
    backgroundColor: COLORS.white,
    padding: SIZES.padding - 7,
    borderRadius: SIZES.padding - 7,
  },
  ingredientName: {
    flex: 1,
    ...FONTS.h4,
    paddingHorizontal: SIZES.padding - 5,
  },
  ingredientQuantity: {
    flex: 1,
    paddingHorizontal: SIZES.padding - 5,
    color: COLORS.gray,
    ...FONTS.bodyBold,
    textAlign: "right",
  },
});
