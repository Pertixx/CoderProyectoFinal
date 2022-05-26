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
import { child, get, onValue, ref, update } from "firebase/database";

import { Feather } from "@expo/vector-icons";
import { db } from "../firebase/firebase-config";
import { useSelector } from "react-redux";

const RecipeCard = ({ recipeItem, navigation, recipeId }) => {
  const [loaded, setLoaded] = useState(false);
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const [authorImage, setAuthorImage] = useState(null);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${recipeItem.author.id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setAuthorImage(snapshot.val().profilePic);
      } else {
        console.log("No data available");
      }
    });
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: appTheme.recipeCardColor }]}>
      <Image
        source={{ uri: recipeItem.image }}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={[styles.itemName, { color: appTheme.textColor1 }]}>
          {recipeItem.name}
        </Text>
        <View style={styles.authorContainer}>
          <Image source={{ uri: authorImage }} style={styles.profilePic} />
          <Text style={[styles.itemInfo, { color: appTheme.textColor5 }]}>
            {recipeItem.author.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Recipe", {
            recipeItem: recipeItem,
            recipeId: recipeId,
          })
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
