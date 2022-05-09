import * as ImagePicker from "expo-image-picker";

import { COLORS, SHADOW, SIZES } from "../constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { setText, showToaster } from "../store/actions/toaster.action";
import { useDispatch, useSelector } from "react-redux";

import { Entypo } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { addImage } from "../store/actions/createRecipe.action";

const ImageSelector = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      dispatch(addImage(result.uri));
      //setImage(result.uri);
    }
  };

  const showImage = () => {
    const image = useSelector((state) => state.createRecipe.recipe.image);
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
    //setImage(image.uri);
    //props.onImage(image.uri)
  };

  return (
    <View style={styles.container}>
      {showImage()}
      <View style={styles.buttonsContainer}>
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
      </View>
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: COLORS.orange,
    height: SIZES.height * 0.6,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    alignItems: "center",
    height: "35%",
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
