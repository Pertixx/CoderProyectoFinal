import { COLORS, FONTS, SIZES } from "../constants";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import React from "react";
import { useSelector } from "react-redux";

const Profile = ({ navigation }) => {
  const profilePic = useSelector((state) => state.user.profilePic);
  const name = useSelector((state) => state.user.name);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.name}>{name}</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    width: SIZES.padding * 5,
    height: SIZES.padding * 5,
    borderRadius: SIZES.padding * 2.5,
    borderWidth: 1,
    borderColor: COLORS.orange,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? SIZES.padding * 5 : SIZES.padding * 2,
  },
  name: {
    ...FONTS.h2,
  },
});
