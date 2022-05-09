import * as ImagePicker from "expo-image-picker";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS, SHADOW, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { setText, showToaster } from "../store/actions/toaster.action";
import { useDispatch, useSelector } from "react-redux";

import { Entypo } from "@expo/vector-icons";
import { addImage } from "../store/actions/createRecipe.action";

const ImageSelector = () => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.createRecipe.recipe.image);
  const containerHeight = useSharedValue(SIZES.bottomTabHeight * 2);
  const buttonsContainerHeight = useSharedValue("100%");

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(containerHeight.value, {
        duration: 400,
      }),
    };
  });

  const buttonsContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(buttonsContainerHeight.value, {
        duration: 400,
      }),
    };
  });

  useEffect(() => {
    console.log(image);
    if (image) {
      containerHeight.value = SIZES.height * 0.6;
      buttonsContainerHeight.value = "35%";
    } else {
      console.log("null");
    }
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      dispatch(addImage(result.uri));
    }
  };

  const showImage = () => {
    if (image) {
      return (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: image,
            }}
          />
        </View>
      );
    }
  };

  const verifyPermissions = async () => {
    const status = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      dispatch(setText("Permisos insuficientes"));
      dispatch(showToaster());

      return false;
    }
    return true;
  };

  const handleTakeImage = async () => {
    const isCameraOk = verifyPermissions();
    if (!isCameraOk) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    dispatch(addImage(image.uri));
  };

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      {showImage()}
      <Animated.View
        style={[styles.buttonsContainer, buttonsContainerAnimatedStyle]}
      >
        <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={handleTakeImage}
        >
          <Entypo name="camera" size={SIZES.icon} color={COLORS.black} />
          <Text>Tomar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.selectFromGallery} onPress={pickImage}>
          <Entypo name="images" size={SIZES.icon} color={COLORS.black} />
          <Text>Añadir foto desde la galeria</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    //height: SIZES.height * 0.6,
    marginTop: SIZES.padding,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    alignItems: "center",
    //height: "35%",
    justifyContent: "space-between",
  },
  takePhotoButton: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-around",
    width: SIZES.width * 0.4,
    height: "55%",
    borderRadius: SIZES.padding - 5,
    ...SHADOW.shadow1,
  },
  selectFromGallery: {
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "space-around",
    width: SIZES.width / 1.5,
    borderRadius: SIZES.padding - 5,
    height: "40%",
    ...SHADOW.shadow1,
  },
  imageContainer: {
    flex: 1,
    marginBottom: SIZES.padding,
    borderRadius: SIZES.padding - 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.padding - 5,
  },
});
