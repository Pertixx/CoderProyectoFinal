import Auth from "../screens/Auth";
import Login from "../screens/Auth/Login";
import Signup from "../screens/Auth/Signup";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Auth"
    >
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
