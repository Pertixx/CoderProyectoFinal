import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Toaster from "./Toaster";
import i18n from "i18n-js";
import { selectIngredient } from "../store/actions/createRecipe.action";

const SelectIngredientCard = ({ item }) => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState(null);
  const [selected, setSelected] = useState(false);
  const ingredients = useSelector((state) => state.createRecipe.ingredients);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  const handleOnPress = () => {
    if (textInput === null || textInput === "") {
      console.log("ERROR EMPTY INPUT");
    } else {
      const new_ingredient = {
        id: item.id,
        name: item.name,
        icon: item.icon,
        quantity: textInput,
      };

      dispatch(selectIngredient(new_ingredient));
      setSelected(!selected);
    }
  };

  useEffect(() => {
    if (ingredients === null) {
      setSelected(false);
    }
  }, [ingredients]);

  return (
    <View
      style={[
        styles.ingredientContainer,
        { backgroundColor: appTheme.backgroundColor2 },
      ]}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image source={{ uri: item.icon }} style={{ width: 30, height: 30 }} />
        <Text style={{ ...FONTS.bodyBold, color: appTheme.textColor1 }}>
          {i18n.t(item.name)}
        </Text>
      </View>
      <TextInput
        placeholder="200 g"
        style={[
          styles.input,
          {
            backgroundColor: appTheme.backgroundColor2,
            color: appTheme.textColor1,
          },
        ]}
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
        editable={!selected}
        placeholderTextColor={appTheme.textColor3}
      />
      <TouchableOpacity onPress={handleOnPress}>
        {selected ? (
          <AntDesign
            name="closecircle"
            size={SIZES.icon}
            color={appTheme.tintColor2}
          />
        ) : (
          <AntDesign
            name="checkcircle"
            size={SIZES.icon}
            color={appTheme.tintColor2}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SelectIngredientCard;

const styles = StyleSheet.create({
  ingredientContainer: {
    width: SIZES.width * 0.3,
    height: SIZES.height * 0.2,
    alignItems: "center",
    justifyContent: "space-around",
    marginRight: SIZES.padding,
    backgroundColor: COLORS.white,
    ...SHADOW.shadow1,
    borderRadius: SIZES.padding - 5,
  },
  input: {
    borderWidth: 1,
    width: "90%",
    height: "20%",
    borderRadius: SIZES.padding - 5,
    padding: SIZES.padding - 10,
  },
});
