import { StyleSheet, View } from 'react-native';

import AppLoading from 'expo-app-loading';
import Navigator from './navigation/Navigator';
import { Provider } from 'react-redux';
import store from './store';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    Heebo: require('./assets/fonts/Heebo-Regular.ttf'),
    HeeboBold: require('./assets/fonts/Heebo-Bold.ttf'),
    Courgette: require('./assets/fonts/Courgette-Regular.ttf'),
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Bold.ttf'),
  })

  if (!loaded) {
    return <AppLoading />
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
