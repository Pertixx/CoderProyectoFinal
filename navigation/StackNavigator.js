import Profile from "../screens/Profile";
import React from "react";
import Recipe from "../screens/Recipe";
import TabNavigator from "./TabNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeStack"
    >
      <Stack.Screen name="HomeStack" component={TabNavigator} />
      <Stack.Screen name="Recipe" component={Recipe} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
