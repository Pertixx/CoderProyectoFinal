import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CreateYourRecipeButton from "./Buttons/CreateYourRecipeButton";
import { FONTS } from "../constants";
import React from "react";
import { SIZES } from "../constants";
import i18n from "i18n-js";
import { useSelector } from "react-redux";

const Offline = ({ navigation }) => {
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <View
      style={[styles.container, { backgroundColor: appTheme.backgroundColor1 }]}
    >
      <Text style={{ ...FONTS.h3, color: appTheme.textColor1 }}>
        {i18n.t("offlineMode")}
      </Text>
      <View
        style={{
          width: "50%",
          height: SIZES.height * 0.07,
          marginTop: SIZES.padding,
        }}
      >
        <CreateYourRecipeButton
          navigation={navigation}
          label={i18n.t("visitProfile")}
          destination={"Profile"}
        />
      </View>
      <StatusBar barStyle={appTheme.statusBar} />
    </View>
  );
};

export default Offline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
