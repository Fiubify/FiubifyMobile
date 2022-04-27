import React, { Component, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import SelectDropdown from 'react-native-select-dropdown'

export default function RegisterForm() {
  const roles = ["Artist", "Listener", "Admin"]
  const [role, setRole] = useState("Artist");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return <View>
    <UiTextInput
      onChange={setEmail}
      style={styles.text_input}
      placeholder="Username or e-mail"
    />
    <UiTextInput
      onChange={setPassword}
      style={styles.text_input}
      placeholder="Password"
      secure={true}
    />
    <SelectDropdown data={roles} onSelect={(role, _index) => {setRole(role);}}  buttonTextAfterSelection={(role, index) => role} rowTextForSelection={(role, index) => role}/>
    <UiButton
      title="REGISTER"
      onPress={() => sendRegister(email, password, role)}
    />
  </View>;
}

async function sendRegister(email, password, role) {
  await fetch('https://fiubify-middleware-staging.herokuapp.com/auth/register-email', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
      role: role
    })
  });
}

const styles = StyleSheet.create({
  text_input: {
    marginBottom: 10,
  }, link: {
    fontWeight: "bold", color: "blue", marginTop: 5, marginBottom: 15,
  }, register_button: {
    margin: 10,
  },
});
