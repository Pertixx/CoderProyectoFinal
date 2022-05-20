import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { COLORS, FONTS, SHADOW, SIZES } from "../constants";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  setAuthor,
  setCategory,
  setDescription,
  setDuration,
  setRecipeName,
} from "../store/actions/createRecipe.action";
import { useDispatch, useSelector } from "react-redux";

import CreateRecipeButton from "../components/Buttons/CreateRecipeButton";
import CustomInput from "../components/Inputs/CustomInput";
import ImageSelector from "../components/ImageSelector";
import SelectIngredientCard from "../components/SelectIngredientCard";
import Toaster from "../components/Toaster";
import { dummyData } from "../constants";

const CreateRecipe = ({ navigation }) => {
  const scrollX = useSharedValue(0); //similar to new Animated.value(0)

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.displayName);
  const selectedCategory = useSelector((state) => state.createRecipe.category);
  const recipeName = useSelector((state) => state.createRecipe.name);
  const recipeDescription = useSelector(
    (state) => state.createRecipe.description
  );
  const recipeDuration = useSelector((state) => state.createRecipe.duration);
  const ingredients = useSelector((state) => state.createRecipe.ingredients);
  const image = useSelector((state) => state.createRecipe.recipe.image);
  const [showButton, setShowButton] = useState(false);
  const [recipeNameOk, setRecipeNameOk] = useState(false);
  const [recipeDurationOk, setRecipeDurationOk] = useState(false);
  const [recipeCategoryOk, setRecipeCategoryOk] = useState(false);
  const userId = useSelector((state) => state.auth.userId);
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  useEffect(() => {
    if (
      recipeNameOk &&
      recipeDurationOk &&
      recipeCategoryOk &&
      ingredients !== null &&
      image !== null
    ) {
      dispatch(setAuthor(userName, userId));
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [recipeNameOk, recipeDurationOk, recipeCategoryOk, ingredients, image]);

  useEffect(() => {
    if (recipeName !== null && recipeName !== "") {
      setRecipeNameOk(true);
    } else {
      setRecipeNameOk(false);
    }
  }, [recipeName]);

  useEffect(() => {
    if (recipeDuration !== null && recipeDuration !== "") {
      setRecipeDurationOk(true);
    } else {
      setRecipeDurationOk(false);
    }
  }, [recipeDuration]);

  useEffect(() => {
    if (selectedCategory !== null) {
      setRecipeCategoryOk(true);
    } else {
      setRecipeCategoryOk(false);
    }
  }, [selectedCategory]);

  const renderItem = (item) => {
    return <SelectIngredientCard item={item} />;
  };

  const renderFirstSection = () => {
    return (
      <View style={{ paddingVertical: SIZES.padding }}>
        <View>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Cual es el nombre de la receta?
          </Text>
          <CustomInput
            placeholder="Fideos con tuco"
            value={recipeName}
            onChange={setRecipeName}
          />
        </View>
        <View style={{ marginTop: SIZES.padding + 5 }}>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Quieres agregar una descripcion?
          </Text>
          <CustomInput
            placeholder="Receta dedicada a..."
            value={recipeDescription}
            onChange={setDescription}
            condition="Opcional"
          />
        </View>
        <View style={{ marginTop: SIZES.padding + 5 }}>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Agrega el tiempo de preparacion
          </Text>
          <CustomInput
            placeholder="30 minutos"
            value={recipeDuration}
            onChange={setDuration}
          />
        </View>
      </View>
    );
  };

  const renderSecondSection = () => {
    return (
      <View style={{ paddingVertical: SIZES.padding }}>
        <View style={{ marginTop: SIZES.padding + 5 }}>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Selecciona una de las siguientes categorias
          </Text>
          <View style={{ marginTop: SIZES.padding }}>
            <FlatList
              data={useSelector((state) => state.categories.categories)}
              keyExtractor={(item) => `${item.id}`}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: SIZES.padding }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => dispatch(setCategory(item.id))}
                    style={[
                      styles.categoryButton,
                      selectedCategory === item.id
                        ? { backgroundColor: appTheme.tintColor3 }
                        : { backgroundColor: appTheme.categoryButtonColor },
                    ]}
                  >
                    <Text
                      style={{
                        ...FONTS.bodyBold,
                        color:
                          selectedCategory === item.id
                            ? COLORS.white
                            : COLORS.black,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: SIZES.padding + 5 }}>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Agreguemos los ingredientes
          </Text>
          <FlatList
            data={dummyData.ingredients}
            keyExtractor={(item) => `${item.id}`}
            renderItem={({ item }) => renderItem(item)}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
            }}
          />
        </View>
      </View>
    );
  };

  const renderThirdSection = () => {
    return (
      <View style={{ paddingVertical: SIZES.padding }}>
        <View>
          <Text style={{ ...FONTS.h2, color: appTheme.textColor1 }}>
            Agrega una foto del plato ya finalizado
          </Text>
          <ImageSelector />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: appTheme.backgroundColor1 }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.scrollView}
      >
        {renderFirstSection()}
        {renderSecondSection()}
        {renderThirdSection()}
        <View style={{ height: SIZES.bottomTabHeight * 3 }} />
      </ScrollView>
      {showButton ? <CreateRecipeButton /> : null}
      <View style={{ paddingHorizontal: SIZES.padding }}>
        <Toaster />
      </View>
    </SafeAreaView>
  );
};

export default CreateRecipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
  },
  scrollView: {
    paddingHorizontal: SIZES.padding,
  },
  categoryButton: {
    width: 100,
    height: 40,
    backgroundColor: COLORS.white,
    marginRight: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.padding + 5,
    ...SHADOW.shadow1,
  },
});
