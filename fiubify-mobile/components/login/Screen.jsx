import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LoginForm from "./LoginForm.jsx";
import RegistrationForm from "./RegistrationForm.jsx";

import UiButton from "../ui/UiButton.jsx";
import { heightPercentageToDP } from "react-native-responsive-screen";

function MainComponent({
  closeRegistration,
  currentForm,
  openRegistration,
  setUid,
  uid,
}) {
  if (currentForm === "LOGIN") {
    return (
      <View style={styles.view}>
        <LoginForm setUid={setUid} openRegistration={openRegistration} />
      </View>
    );
  } else if (currentForm === "SIGNUP") {
    return (
      <View>
        <RegistrationForm setUid={setUid} backFunction={closeRegistration} />
      </View>
    );
  }
}

function LoginScreen({ currentForm, setCurrent, setUid, uid }) {
  console.log(currentForm, setCurrent);
  return (
    <MainComponent
      setUid={setUid}
      uid={uid}
      currentForm={currentForm}
      openRegistration={() => setCurrent("SIGNUP")}
      closeRegistration={() => setCurrent("MAINSCREEN")}
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
