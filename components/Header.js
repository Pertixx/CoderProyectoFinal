import { COLORS, FONTS, SIZES, images } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Feather } from "@expo/vector-icons";
import React from "react";
import { dummyData } from "../constants";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
  const displayName = useSelector((state) => state.user.name);
  const profilePic = useSelector((state) => state.user.profilePic);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <View style={{ flex: 1 }}>
          <View style={styles.iconContainer}>
            <Feather name="sun" size={24} color={COLORS.gray} />
            <Text style={styles.welcomeText}>Buenas Noches</Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={{ borderRadius: SIZES.padding }}
        >
          <Image source={{ uri: profilePic }} style={styles.profileImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    //alignItems: "center",
    height: SIZES.height * 0.08,
    width: "100%",
    marginTop: SIZES.padding,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: SIZES.padding - 5,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: COLORS.black2,
    ...FONTS.h2,
  },
  welcomeText: {
    color: COLORS.black2,
    ...FONTS.h4,
    marginLeft: SIZES.padding,
  },
});
