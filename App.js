import { LogBox, StyleSheet, View } from "react-native";
import { deleteDatabase, init } from "./db";

import AppLoading from "expo-app-loading";
import Navigator from "./navigation/Navigator";
import { Provider } from "react-redux";
import Toaster from "./components/Toaster";
import store from "./store";
import { useFonts } from "expo-font";

init()
  .then(() => console.log("Database initialized"))
  .catch((error) => {
    console.log("Database fail to connect");
    console.log(error.message);
  });

//deleteDatabase();

export default function App() {
  LogBox.ignoreLogs(["Setting a timer"]);
  const [loaded] = useFonts({
    Heebo: require("./assets/fonts/Heebo-Regular.ttf"),
    HeeboBold: require("./assets/fonts/Heebo-Bold.ttf"),
    Courgette: require("./assets/fonts/Courgette-Regular.ttf"),
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!loaded) {
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
