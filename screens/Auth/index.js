import { COLORS, FONTS, SIZES, images } from "../../constants";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";

import CustomButton from "../../components/Buttons/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { getUser } from "../../store/actions/auth.action";
import i18n from "i18n-js";
import { useDispatch } from "react-redux";

const Auth = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const renderBackground = () => {
    return (
      <View style={styles.backgroundImageContainer}>
        <ImageBackground
          source={images.backgroundLogin2}
          style={styles.image}
          resizeMode="cover"
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparent, COLORS.black]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{i18n.t("loginScreenTitle")}</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  const renderDetailsSection = () => {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.descriptionText}>
          {i18n.t("loginScreenSubtitle")}
        </Text>
        <View style={styles.buttonsContainer}>
          <CustomButton
            onPress={() => navigation.navigate("Login")}
            text={i18n.t("login")}
            colors={[COLORS.darkOrange, COLORS.orange]}
            buttonStyle={styles.loginButton}
          />
          <CustomButton
            onPress={() => navigation.navigate("Signup")}
            text={i18n.t("signup")}
            buttonStyle={styles.signupButton}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {renderBackground()}
      {renderDetailsSection()}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  backgroundImageContainer: {
    height: "65%",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    height: "70%",
    justifyContent: "flex-end",
    paddingHorizontal: SIZES.padding,
  },
  title: {
    color: COLORS.white,
    ...FONTS.largeTitle,
    width: "80%",
  },
  buttonsContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    marginTop: 40,
  },
  loginButton: {
    paddingVertical: SIZES.padding,
    borderRadius: 20,
    marginBottom: 10,
  },
  signupButton: {
    paddingVertical: SIZES.padding,
    borderRadius: 20,
    borderColor: COLORS.darkLime,
    borderWidth: 1,
    marginTop: 10,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  descriptionText: {
    color: COLORS.gray,
    ...FONTS.body,
    width: "70%",
    marginTop: 10,
  },
});
