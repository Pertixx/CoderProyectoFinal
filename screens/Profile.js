import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Feather } from "@expo/vector-icons";
import RecipeCard from "../components/RecipeCard";
import { getCreatedRecipes } from "../store/actions/recipe.action";

const Profile = ({ navigation }) => {
  const profilePic = useSelector((state) => state.user.profilePic);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.createdRecipes);
  const userName = useSelector((state) => state.user.name);

  useEffect(() => {
    dispatch(getCreatedRecipes());
  }, []);

  const renderItem = (item) => {
    console.log(item);
    return (
      <View
        style={{
          //paddingHorizontal: SIZES.padding,
          marginRight: SIZES.padding,
          width: 300,
        }}
      >
        <View style={styles.card}>
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.details}>
            <Text style={styles.itemName}>{item.title}</Text>
            <View style={styles.authorContainer}>
              {/* <Image source={images.myProfile} style={styles.profilePic} /> */}
              <Text style={styles.itemInfo}>{userName}</Text>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Recipe", { recipeItem: item })}
            style={styles.button}
          >
            <Feather
              name="arrow-right"
              size={SIZES.icon}
              color={COLORS.white}
            />
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={{ ...FONTS.h3 }}>Recetas creadas por ti</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => renderItem(item)}
        horizontal
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
    width: SIZES.bottomTabHeight * 1.6,
    height: SIZES.bottomTabHeight * 1.6,
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
