import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatedRecipeCard from "../components/CreatedRecipeCard";
import { getCreatedRecipes } from "../store/actions/recipe.action";

const Profile = ({ navigation }) => {
  const profilePic = useSelector((state) => state.user.profilePic);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.createdRecipes);
  const userName = useSelector((state) => state.user.name);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    dispatch(getCreatedRecipes(userId));
  }, []);

  const renderItem = (item) => {
    console.log(item);
    return (
      <View>
        <CreatedRecipeCard recipe={item} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: profilePic }}
          style={styles.profilePic}
          resizeMode="cover"
        />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={{ ...FONTS.h3 }}>Recetas creadas por ti</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  profilePic: {
    width: SIZES.padding * 5,
    height: SIZES.padding * 5,
    borderRadius: SIZES.padding * 2.5,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? SIZES.padding * 5 : SIZES.padding * 2,
  },
  name: {
    ...FONTS.h2,
  },
});
