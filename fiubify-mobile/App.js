import React from "react";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore.js";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/login/Screen";
import Profile from "./components/profile/Profile";

const store = configureStore();

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;
