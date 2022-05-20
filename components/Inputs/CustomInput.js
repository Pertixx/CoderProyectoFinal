import { COLORS, FONTS, SIZES } from "../../constants";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import React from "react";

const CustomInput = ({ placeholder, value, onChange, condition = null }) => {
  const dispatch = useDispatch();
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: appTheme.backgroundColor2,
            color: appTheme.textColor1,
            borderColor: appTheme.tintColor2,
          },
        ]}
        value={value}
        onChangeText={(value) => dispatch(onChange(value))}
        placeholder={placeholder}
        placeholderTextColor={appTheme.textColor3}
      />
      {condition != null ? (
        <Text style={styles.condition}>{condition}</Text>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: SIZES.height * 0.05,
    marginTop: SIZES.padding - 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "70%",
    borderWidth: 1,
    height: "100%",
    borderRadius: SIZES.padding - 5,
    padding: SIZES.padding - 5,
  },
  condition: {
    color: COLORS.darkOrange,
    ...FONTS.h4,
  },
});
