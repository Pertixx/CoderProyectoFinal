import { COLORS, FONTS, SIZES, images } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { dummyData } from "../constants";
import i18n from "i18n-js";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
  const displayName = useSelector((state) => state.auth.displayName);
  const profilePic = useSelector((state) => state.user.profilePic);
  const appTheme = useSelector((state) => state.appTheme.appTheme);
  const [message, setMessage] = useState("Bienvenido");
  const [icon, setIcon] = useState("sun");

  useEffect(() => {
    const today = new Date();
    const time = today.getHours();
    if (time < 12) {
      setMessage(i18n.t("welcomeMorning"));
      setIcon("sun");
    } else if (time < 18) {
      setMessage(i18n.t("welcomeEvening"));
      setIcon("sunset");
    } else {
      setMessage(i18n.t("welcomeNight"));
      setIcon("moon");
    }
  }, []);

  const renderWelcome = () => {
    return (
      <View style={styles.iconContainer}>
        <Feather name={icon} size={SIZES.icon} color={COLORS.gray} />
        <Text style={[styles.welcomeText, { color: appTheme.textColor1 }]}>
          {message}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.titleContainer}>
        <View style={{ flex: 1 }}>
          {renderWelcome()}
          <Text style={[styles.name, { color: appTheme.textColor1 }]}>
            {displayName}
          </Text>
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
