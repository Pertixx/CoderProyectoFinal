import { COLORS, FONTS, SIZES, images } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";
import React from "react";

const RecipeCreatorCard = ({ author, recipeDescription = null }) => {
  const renderDescription = () => {
    if (recipeDescription != null) {
      return (
        <Text style={styles.description} numberOfLines={4}>
          {recipeDescription}
        </Text>
      );
    }
  };

  return (
    <BlurView
      style={[StyleSheet.absoluteFillObject, styles.container]}
      tint="dark"
      intensity={Platform.OS != "ios" ? 80 : 30}
    >
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={images.myProfile}
            style={{ width: 30, height: 30, borderRadius: 5 }}
          />
          <View style={{ marginLeft: SIZES.padding }}>
            <Text style={{ ...FONTS.h4, color: COLORS.gray3 }}>
              Receta creada por:
            </Text>
            <Text style={styles.name}>{author.name}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => console.log("Go to author profile")}
          style={styles.button}
        >
          <Feather name="arrow-right" size={SIZES.icon} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {renderDescription()}
    </BlurView>
  );
};

export default RecipeCreatorCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.padding - 5,
    padding: SIZES.padding - 5,
    justifyContent: "center",
  },
  title: {
    ...FONTS.h1Bold,
    color: COLORS.white,
    width: "100%",
  },
  name: {
    color: COLORS.orange,
    ...FONTS.h3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    //backgroundColor: 'red',
  },
  description: {
    color: COLORS.white,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: SIZES.padding - 5,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
