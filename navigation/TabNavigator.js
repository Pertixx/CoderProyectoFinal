import { COLORS, SHADOW, SIZES } from "../constants";
import { Platform, StyleSheet, Text, View } from "react-native";

import Bookmark from "../screens/Bookmark";
import CreateRecipe from "../screens/CreateRecipe";
import Home from "../screens/Home";
import React from "react";
import Search from "../screens/Search";
import TabButton from "../components/Buttons/TabButton";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const tabsArray = [
  { route: "Home", iconName: "compass", component: Home },
  { route: "Search", iconName: "search", component: Search },
  { route: "CreateRecipe", iconName: "plus-circle", component: CreateRecipe },
  { route: "Bookmark", iconName: "heart", component: Bookmark },
];

const TabNavigator = () => {
  const appTheme = useSelector((state) => state.appTheme.appTheme);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [
          styles.tab,
          Platform.OS === "ios"
            ? { bottom: SIZES.padding * 3 }
            : { bottom: SIZES.padding },
          { backgroundColor: appTheme.backgroundColor2 },
        ],
      }}
      initialRouteName="Home"
    >
      {tabsArray.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={{
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tab: {
    position: "absolute",
    height: SIZES.bottomTabHeight,
    left: SIZES.padding,
    right: SIZES.padding,
    borderRadius: SIZES.padding,
    ...SHADOW.shadow1,
    alignItems: "center",
    justifyContent: "center",
  },
});
