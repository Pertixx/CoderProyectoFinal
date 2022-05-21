import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import AuthStackNavigator from "./AuthStackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
import { insertUser } from "../db";
import { useSelector } from "react-redux";

const Navigator = () => {
  const userId = useSelector((state) => state.auth.userId);
  const userName = useSelector((state) => state.auth.displayName);

  // useEffect(() => {
  //   if (userId !== null) {
  //     insertUser(userId, userName);
  //   }
  // }, [userId]);

  return (
    <NavigationContainer>
      {userId ? <StackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
