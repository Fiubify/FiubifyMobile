import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore.js";
import MainScreen from "./components/MainScreen";
import RegistrationForm from "./components/login/RegistrationForm";
import LoginForm from "./components/login/LoginForm";
import PasswordRecoveryForm from "./components/login/PasswordRecoveryForm";
import ScreenController from "./components/Screens/ScreenController";
import { LogBox } from "react-native";
import SongForm from "./components/Song/SongForm.js";
import { AlbumForm } from "./components/Album/AlbumForm";
import MyProfile from "./components/profile/MyProfile";
import { PlaylistForm } from "./components/Playlist/PlaylistForm";
import ExternProfile from "./components/profile/ExternProfile";
import { SubscriptionForm } from "./components/profile/SubscriptionForm";
import { PlaylistEdit } from "./components/Playlist/PlaylistEdit";
import SendMessagesView from "./components/Message/SendMessagesView.js";
import MessagesView from "./components/Message/MessagesView.js";

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
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="ExternProfile" component={ExternProfile} />
          <Stack.Screen name="SongForm" component={SongForm} />
          <Stack.Screen name="AlbumForm" component={AlbumForm} />
          <Stack.Screen name="PlaylistForm" component={PlaylistForm} />
          <Stack.Screen name="PlaylistEdit" component={PlaylistEdit} />
          <Stack.Screen name="SubsciptionForm" component={SubscriptionForm} />
          <Stack.Screen name="SendMessagesView" component={SendMessagesView} />
          <Stack.Screen name="MessagesView" component={MessagesView} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
