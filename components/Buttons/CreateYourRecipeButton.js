import { COLORS, FONTS, SIZES } from "../../constants/";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import React from "react";
import i18n from "i18n-js";
import { useSelector } from "react-redux";

const CreateYourRecipeButton = ({
  navigation,
  label = null,
  destination = "CreateRecipe",
}) => {
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <View
      style={[styles.container, { backgroundColor: appTheme.loadMoreButton }]}
    >
      {!label ? (
        <Text style={styles.text}>{i18n.t("createYourRecipe")}</Text>
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(destination)}
        style={[styles.button, { backgroundColor: appTheme.tintColor4 }]}
      >
        <Feather name="arrow-right" size={SIZES.icon} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default CreateYourRecipeButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: SIZES.padding,
  },
  text: {
    color: COLORS.white,
    ...FONTS.h3,
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
