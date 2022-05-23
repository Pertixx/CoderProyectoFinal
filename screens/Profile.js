import { COLORS, FONTS, SHADOW, SIZES, icons } from "../constants";
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
import { deleteUser, updateUserTheme } from "../db";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import CreatedRecipeCard from "../components/CreatedRecipeCard";
import CustomSwitch from "../components/CustomSwitch";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getCreatedRecipes } from "../store/actions/recipe.action";
import { logOut } from "../store/actions/auth.action";
import { selectTheme } from "../store/actions/theme.action";

const Profile = ({ navigation }) => {
  const profilePic = useSelector((state) => state.user.profilePic);
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.recipes.createdRecipes);
  const userId = useSelector((state) => state.auth.userId);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  useEffect(() => {
    dispatch(getCreatedRecipes(userId));
  }, []);

  const renderItem = (item) => {
    return (
      <View>
        <CreatedRecipeCard recipe={item} />
      </View>
    );
  };

  const handleToggleTheme = () => {
    if (appTheme.name === "light") {
      console.log("dark");
      dispatch(selectTheme("dark"));
      updateUserTheme(userId, "dark");
    } else {
      console.log("light");
      dispatch(selectTheme("light"));
      updateUserTheme(userId, "light");
    }
  };

  const renderBackButton = () => {
    return (
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={SIZES.icon} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogOut} style={styles.backButton}>
          <AntDesign name="logout" size={SIZES.icon} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderCreatedRecipes = () => {
    if (data.length > 0) {
      return (
        <View style={{ width: "100%", marginTop: SIZES.padding * 2 }}>
          <Text
            style={{
              ...FONTS.h3,
              marginBottom: SIZES.padding - 5,
              color: appTheme.textColor1,
            }}
          >
            Recetas creadas por ti
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => renderItem(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      );
    }
  };

  const handleLogOut = () => {
    dispatch(logOut(userId));
  };

  const renderSettings = () => {
    return (
      <View style={{ alignItems: "center", marginTop: SIZES.padding * 3 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "65%",
            height: SIZES.bottomTabHeight,
            marginBottom: SIZES.padding,
          }}
        >
          <Ionicons name="moon" size={SIZES.icon} color={appTheme.tintColor1} />
          <CustomSwitch label={"Tema Oscuro"} onPress={handleToggleTheme} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "65%",
            height: SIZES.bottomTabHeight,
            justifyContent: "space-between",
          }}
        >
          <Entypo
            name="language"
            size={SIZES.icon}
            color={appTheme.tintColor1}
          />
          <Text style={{ ...FONTS.h3, color: appTheme.textColor1 }}>
            Idioma
          </Text>
          <Text style={{ color: appTheme.textColor3, ...FONTS.h3 }}>
            Español
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: appTheme.backgroundColor1 }]}
    >
      {renderBackButton()}
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: profilePic }}
          style={styles.profilePic}
          resizeMode="cover"
        />
        <Text style={[styles.name, { color: appTheme.textColor1 }]}>
          {name}
        </Text>
      </View>
      {renderSettings()}
      {renderCreatedRecipes()}
      <View
        style={{
          marginBottom: SIZES.bottomTabHeight * 2,
        }}
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
    marginBottom: SIZES.padding,
  },
  headerContainer: {
    alignItems: "center",
    //marginTop: Platform.OS === "ios" ? SIZES.padding * 5 : SIZES.padding * 2,
  },
  name: {
    ...FONTS.h2,
  },
  backButtonContainer: {
    width: "100%",
    marginTop: Platform.OS === "ios" ? SIZES.padding * 4 : SIZES.padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 45,
    width: 45,
    borderRadius: 12,
    ...SHADOW.shadow1,
    backgroundColor: COLORS.white,
  },
});
