import * as Localization from "expo-localization";

import { LogBox, StyleSheet, View } from "react-native";
import { deleteDatabase, deleteUserDB, init, initUser } from "./db";
import { useEffect, useState } from "react";

import AppLoading from "expo-app-loading";
import Navigator from "./navigation/Navigator";
import { Provider } from "react-redux";
import setLocale from "./locale";
import store from "./store";
import { useFonts } from "expo-font";

// deleteDatabase();
// deleteUserDB();

console.log(Localization.locale.substring(0, 2));
setLocale(Localization.locale.substring(0, 2));

export default function App() {
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    localBoot();
    // console.log(Localization.locale.substring(0, 2));
    // setLocale(Localization.locale.substring(0, 2));
  }, []);

  if (!fontsLoaded || loading) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
