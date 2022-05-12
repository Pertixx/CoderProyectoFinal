import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, SHADOW, SIZES, images } from "../constants";
import React, { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";

const RecipeCard = ({ recipeItem, navigation }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(loaded);
  }, [loaded]);

  return (
    <View style={styles.card}>
      <Image
        onLoad={() => setLoaded(true)}
        source={{ uri: recipeItem.item.image }}
        resizeMode="cover"
        style={[
          styles.image,
          loaded
            ? {
                width: SIZES.bottomTabHeight * 1.6,
                height: SIZES.bottomTabHeight * 1.6,
              }
            : { width: 0, height: 0 },
        ]}
      />
      <ActivityIndicator
        size={"small"}
        color={COLORS.black}
        style={{ display: loaded ? "none" : "flex" }}
      />
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
    padding: SIZES.padding - 5,
    marginTop: SIZES.padding - 5,
    borderRadius: SIZES.padding - 5,
    backgroundColor: COLORS.white,
    ...SHADOW.shadow1,
  },
  image: {
    //width: SIZES.bottomTabHeight * 1.6,
    //height: SIZES.bottomTabHeight * 1.6,
    borderRadius: SIZES.padding,
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
