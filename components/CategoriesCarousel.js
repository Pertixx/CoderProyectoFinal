import { COLORS, FONTS, SIZES } from "../constants";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CategoryButton from "./Buttons/CategoryButton";
import React from "react";
import SeeAllButton from "./Buttons/SeeAllButton";
import { useSelector } from "react-redux";

const CategoriesCarousel = ({ showSeeAll = false }) => {
  const categories = useSelector((state) => state.categories.categories);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <View style={styles.container}>
      <View style={styles.categoryContainer}>
        <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
          Categorias
        </Text>
        {showSeeAll ? (
          <SeeAllButton
            text="Ver todas"
            onPress={() => console.log("Navegar a otra screen?")}
            textStyle={{ color: COLORS.orange, ...FONTS.bodyBold }}
          />
        ) : null}
      </View>
      <FlatList
        data={categories}
        keyExtractor={(item) => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <CategoryButton item={item} />}
      />
    </View>
  );
};

export default CategoriesCarousel;

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.padding,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: SIZES.padding,
  },
  categoryButton: {
    width: 100,
    height: 40,
    marginRight: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  buttonText: {
    ...FONTS.bodyBold,
  },
});
