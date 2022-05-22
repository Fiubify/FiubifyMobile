import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import LoginForm from "./LoginForm.jsx";
import RegistrationForm from "./RegistrationForm.jsx";

function MainComponent({
  backFunction,
  currentForm,
  openRegistration,
  setUid,
  uid,
}) {
  if (currentForm === "LOGIN") {
    return (
      <View style={styles.view}>
        <LoginForm
          setUid={setUid}
          openRegistration={openRegistration}
          backFunction={backFunction}
        />
      </View>
    );
  } else if (currentForm === "SIGNUP") {
    return (
      <View style={styles.view}>
        <RegistrationForm setUid={setUid} backFunction={backFunction} />
      </View>
    );
  }
}

function LoginScreen({ currentForm, setCurrent, setUid, uid }) {
  return (
    <MainComponent
      setUid={setUid}
      uid={uid}
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
