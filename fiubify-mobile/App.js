import React from "react";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./components/profile/Profile";
import MainScreen from "./components/MainScreen";
import RegistrationForm from "./components/login/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import PasswordRecoveryForm from "./components/login/PasswordRecoveryForm";
import ScreenController from "./components/Screens/ScreenController";

const store = configureStore();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Entry" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Entry" component={ MainScreen } />
          <Stack.Screen name="Login" component={ LoginForm } />
          <Stack.Screen name="Registration" component={RegistrationForm} />
          <Stack.Screen name="ForgotPassword" component={ PasswordRecoveryForm } />
          <Stack.Screen name="Home" component={ScreenController} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
