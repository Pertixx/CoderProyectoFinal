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
import React, { useState } from "react";
import {
  signup,
  updateEmail,
  updateName,
  updatePass,
} from "../../store/actions/auth.action";
import { useDispatch, useSelector } from "react-redux";

import AuthInput from "../../components/Inputs/AuthInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import SeeAllButton from "../../components/Buttons/SeeAllButton";

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const form = "signup";
  const formName = useSelector((state) => state.auth.formFields.formName);
  const formEmail = useSelector((state) => state.auth.formFields.formEmail);
  const formPass = useSelector((state) => state.auth.formFields.formPass);
  const formValid = useSelector((state) => state.auth.formValid);
  const formNameValid = useSelector(
    (state) => state.auth.formFieldsValidation.formName
  );
  const formEmailValid = useSelector(
    (state) => state.auth.formFieldsValidation.formEmail
  );
  const formPassValid = useSelector(
    (state) => state.auth.formFieldsValidation.formPass
  );

  const handleOnPress = () => {
    if (formValid) dispatch(signup(formName, formEmail, formPass));
  };

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
          Log in
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
            <Text style={styles.label}>Nombre</Text>
            <AuthInput
              value={formName}
              onChange={updateName}
              listenTo={formNameValid}
              form={form}
            />
          </View>
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
            text="Crear Cuenta"
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
              Ya tienes una cuenta?
            </Text>
            <SeeAllButton
              text="Login"
              onPress={() => navigation.navigate("Login")}
              textStyle={{
                ...FONTS.bodyBold,
                color: COLORS.white,
                marginLeft: SIZES.padding,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

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
    marginTop: SIZES.bottomTabHeight,
  },
});
