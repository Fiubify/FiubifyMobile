import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

export default function RegistrationForm({ backFunction }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date())

  if (!sent) {
    return (
      <View>
        <Text style={styles.link} onPress={() => backFunction()}>
          Back
        </Text>
        <UiTextInput
          onChange={setEmail}
          style={styles.text_input}
          placeholder="E-mail"
        />
        <UiTextInput
          onChange={setPassword}
          style={styles.text_input}
          placeholder="Password"
          secure={true}
        />
        <UiTextInput
          onChange={setPasswordRepeat}
          style={styles.text_input}
          placeholder="Repeat password"
          secure={true}
        />
        <UiTextInput
          onChange={setName}
          style={styles.text_input}
          placeholder="Your name"
        />
        <UiTextInput
          onChange={setSurName}
          style={styles.text_input}
          placeholder="Your surname"
        />
        <UiButton onPress={() => {
          DateTimePickerAndroid.open({
            value: birthDate,
            onChange: (event, selectedDate) => setBirthDate(selectedDate),
            mode: 'date',
          });
        }}
                  title="BirthDate" />
        <UiButton
          title="DONE"
          onPress={() => send(email, password, passwordRepeat, name, surname, birthDate)}
        />
      </View>
    );
  } else {
    return (
      <Text>You are registered</Text>
    );
  }

  async function send(email, password, passwordRepeat, name, surname, birthDate) {
    let url = 'https://fiubify-middleware-staging.herokuapp.com/auth/register-email';

    if (password != passwordRepeat) {
      alert("Password does not match confirmation!");
      return;
    }

    let request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: "Listener",
        name: name,
        surname: surname,
        birthDate: birthDate.toJSON(),
        plan: "Free",
      }),
    };

    let response = await fetch(url, request)

    if (response.ok) {
      setSent(true);
    } else {
      alert(response.statusText);
    }
  }
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15
  },
  text_input: {
    marginBottom: 10,
  }
})
