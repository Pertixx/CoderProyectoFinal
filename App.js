// TODOS LOS ICONOS UTILIZADOS PERTENECEN A www.flaticon.com

import * as Localization from "expo-localization";

import { LogBox, StyleSheet, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { deleteDatabase, deleteUserDB, init, initUser } from "./db";
import { getIngredients, getRecipes } from "./store/actions/recipe.action";
import { useEffect, useState } from "react";

import AppLoading from "expo-app-loading";
import Navigator from "./navigation/Navigator";
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from "./Splash";
import setLocale from "./locale";
import { setOffline } from "./store/actions/user.action";
import store from "./store";
import { useFonts } from "expo-font";

// deleteDatabase();
// deleteUserDB();

console.log(Localization.locale.substring(0, 2));
setLocale(Localization.locale.substring(0, 2));

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [maxRecipesToGet, setMaxRecipesToGet] = useState(20);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);

  LogBox.ignoreLogs(["Setting a timer"]);
  const [fontsLoaded] = useFonts({
    Heebo: require("./assets/fonts/Heebo-Regular.ttf"),
    HeeboBold: require("./assets/fonts/Heebo-Bold.ttf"),
    Courgette: require("./assets/fonts/Courgette-Regular.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const localBoot = () => {
    init()
      .then(() => {
        console.log("Database initialized");
        initUser()
          .then(() => {
            console.log("User Database initialized");
            setLoading(false);
          })
          .catch((error) => {
            console.log("Database fail to connect");
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log("Database fail to connect");
        console.log(error.message);
      });
  };

  const checkConnection = async () => {
    await NetInfo.fetch().then((state) => {
      console.log(state.isConnected);
      return state.isConnected;
    });
  };

  useEffect(() => {
    localBoot();
    const isConnected = checkConnection();
    if (isConnected) {
      dispatch(getRecipes(maxRecipesToGet));
      dispatch(getIngredients());
    } else {
      dispatch(setOffline());
    }
  }, []);

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  if (showSplash) {
    return <SplashScreen onFinish={setShowSplash} />;
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </View>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
