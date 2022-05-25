import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginForm from "./LoginForm.jsx";
import RegistrationForm from "./RegistrationForm.jsx";
import UiButton from '../ui/UiButton.jsx'
import PasswordRecovery from "./PasswordRecovery";

function MainComponent({ closeRegistration, currentForm, openRegistration, navigation, backFunction }) {
  if (currentForm === 'LOGIN') {
    return (
      <View>
        <LoginForm navigation={navigation} />
        <PasswordRecovery/>
        <UiButton
          title="SIGN UP"
          onPress={openRegistration}
        />
      </View>
    );
  } else if (currentForm === "SIGNUP") {
    return (

      <View>
        <RegistrationForm
          navigation={navigation}
          backFunction={backFunction}
        />
      </View>
    );
  }
}

function LoginScreen({ navigation, setCurrent, currentForm }) {
  const [currentForm, setCurrentForm] = useState('LOGIN')
  return (
    <MainComponent
      navigation={navigation}
      currentForm={currentForm}
      openRegistration={() => setCurrent("SIGNUP")}
      backFunction={() => setCurrent("MAINSCREEN")}
    />
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  link: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
    marginBottom: 15,
  },
  register_button: {
    margin: 10,
  },
});

export default LoginScreen;
