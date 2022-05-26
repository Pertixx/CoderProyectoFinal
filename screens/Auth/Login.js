import { COLORS, FONTS, SIZES } from "../../constants";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import {
  clearError,
  setError,
  signIn,
  updateEmail,
  updatePass,
} from "../../store/actions/auth.action";
import { setText, showToaster } from "../../store/actions/toaster.action";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../../components/Inputs/AuthInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import SeeAllButton from "../../components/Buttons/SeeAllButton";
import Toaster from "../../components/Toaster";
import { insertUser } from "../../db";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const form = "login";
  const formEmail = useSelector(
    (state) => state.auth.formLogInFields.formEmail
  );
  const formPass = useSelector((state) => state.auth.formLogInFields.formPass);
  const formLogInValid = useSelector((state) => state.auth.formLogInValid);
  const formEmailValid = useSelector(
    (state) => state.auth.formLogInValidation.formEmail
  );
  const formPassValid = useSelector(
    (state) => state.auth.formLogInValidation.formPass
  );
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.displayName);

  const handleOnPress = () => {
    if (formLogInValid) {
      dispatch(signIn(formEmail, formPass));
    } else {
      dispatch(setError("Revisa los campos"));
    }
  };

  useEffect(() => {
    if (userId !== null) {
      insertUser(userId, userName);
    }
  }, [userId]);

  useEffect(() => {
    console.log(error);
    if (error !== null) {
      dispatch(setText(error));
      dispatch(showToaster());
      dispatch(clearError());
    }
  }, [error]);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={SIZES.icon}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h1Bold,
          }}
        >
          Sign Up
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View
          style={{
            marginVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <AuthInput
              type="email-address"
              value={formEmail}
              onChange={updateEmail}
              listenTo={formEmailValid}
              form={form}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <AuthInput
              secure
              value={formPass}
              onChange={updatePass}
              listenTo={formPassValid}
              form={form}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <CustomButton
            text="Log In"
            colors={[COLORS.darkOrange, COLORS.orange]}
            buttonStyle={styles.button}
            onPress={handleOnPress}
          />
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: SIZES.padding,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: COLORS.gray, lineHeight: 22 }}>
              Todavia no tienes una cuenta?
            </Text>
            <SeeAllButton
              text="SignUp"
              onPress={() => navigation.navigate("Signup")}
              textStyle={{
                ...FONTS.bodyBold,
                color: COLORS.white,
                marginLeft: SIZES.padding,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <Toaster />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    marginTop: Platform.OS === "ios" ? SIZES.padding * 3.5 : SIZES.padding,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    //backgroundColor: "red",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray,
    width: SIZES.icon + 15,
    height: SIZES.icon + 15,
    borderRadius: SIZES.padding - 5,
    marginRight: SIZES.padding + 10,
  },
  label: {
    color: COLORS.white,
    marginBottom: SIZES.padding - 5,
    ...FONTS.bodyBold,
  },
  inputContainer: {
    marginTop: SIZES.padding * 2,
  },
  button: {
    paddingVertical: SIZES.padding,
    borderRadius: 20,
    marginBottom: 10,
  },
  footerContainer: {
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.bottomTabHeight * 2,
  },
});
