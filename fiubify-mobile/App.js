import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore.js";
import MainScreen from "./components/MainScreen";
import RegistrationForm from "./components/login/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import PasswordRecoveryForm from "./components/login/PasswordRecoveryForm";
import ScreenController from "./components/Screens/ScreenController";
import { LogBox } from "react-native";
import SongForm from "./components/Screens/SongForm.js";
import { AlbumForm } from "./components/Screens/AlbumForm.js";
import Profile from "./components/profile/Profile";
import { PlaylistForm } from "./components/Screens/PlaylistForm";

LogBox.ignoreAllLogs(true);

const store = configureStore();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator
          initialRouteName="Entry"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Entry" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Registration" component={RegistrationForm} />
          <Stack.Screen
            name="ForgotPassword"
            component={PasswordRecoveryForm}
          />
          <Stack.Screen name="Home" component={ScreenController} />
          <Stack.Screen name="MyProfile" component={Profile} />
          <Stack.Screen name="SongForm" component={SongForm} />
          <Stack.Screen name="AlbumForm" component={AlbumForm} />
          <Stack.Screen name="PlaylistForm" component={PlaylistForm} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
