import { COLORS, FONTS, SHADOW, SIZES, images } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import React from "react";

const RecipeCard = ({ recipeItem, navigation }) => {
  return (
    <View style={styles.card}>
      <Image source={images.spagetti} resizeMode="cover" style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{recipeItem.item.name}</Text>
        <View style={styles.authorContainer}>
          <Image source={images.myProfile} style={styles.profilePic} />
          <Text style={styles.itemInfo}>{recipeItem.item.author.name}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Recipe", { recipeItem: recipeItem })
        }
        style={styles.button}
      >
        <Feather name="arrow-right" size={SIZES.icon} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    ...SHADOW.shadow1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  details: {
    width: "65%",
    paddingHorizontal: SIZES.padding + 5,
  },
  itemName: {
    flex: 1,
    ...FONTS.h3,
  },
  itemInfo: {
    color: COLORS.gray,
    ...FONTS.body,
  },
  authorContainer: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
  },
  profilePic: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: SIZES.padding - 8,
  },
  button: {
    position: "absolute",
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.black,
  },
});
