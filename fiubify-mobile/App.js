import React, { Component } from "react";
import { LogBox } from "react-native";
import { Provider } from 'react-redux';
import configureStore from './state/store/configureStore.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/login/Screen';
import Profile from './components/profile/Profile';

LogBox.ignoreAllLogs(true)

const store = configureStore();

const Stack = createNativeStackNavigator();

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    );
  }
}

export default App;
