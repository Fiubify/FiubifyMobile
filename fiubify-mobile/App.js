import React, { Component } from "react";
import { LogBox } from "react-native";
import configureStore from './state/store/configureStore.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/login/Screen';
import Profile from './components/profile/Profile';
import { Provider } from "react-redux";

LogBox.ignoreAllLogs(true)

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
