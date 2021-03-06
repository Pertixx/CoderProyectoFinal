import { COLORS, SHADOW, SIZES, dummyData } from "../constants";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const SearchBar = ({ text, onChangeText, handleSearch }) => {
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: appTheme.backgroundColor2 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            handleSearch();
            onChangeText("");
            Keyboard.dismiss();
          }}
          style={styles.searchButton}
        >
          <Feather
            name="search"
            size={SIZES.icon}
            color={appTheme.tintColor1}
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: appTheme.tintColor1 }]}
          onChangeText={(text) => onChangeText(text)}
          value={text}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.padding,
    flexDirection: "row",
    height: SIZES.height * 0.07,
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: SIZES.padding,
    width: "100%",
    height: "90%",
    borderColor: COLORS.gray,
    backgroundColor: COLORS.white,
  },
  searchButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  filterButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.padding - 5,
    backgroundColor: COLORS.gray3,
  },
  input: {
    width: "80%",
    height: "100%",
  },
});
