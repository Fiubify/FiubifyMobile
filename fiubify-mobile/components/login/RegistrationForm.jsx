import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

export default function RegistrationForm({backFunction}) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

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
        <UiButton 
          title="DONE"
          onPress={() => send(email, password, passwordRepeat)}
        />
      </View>
    )
  } else {
    return (
      <Text>You are registered</Text>
    )
  }

  async function send(email, password, passwordRepeat) {
    let url = 'https://fiubify-middleware-staging.herokuapp.com/auth/register-email'

    if (password != passwordRepeat) {
      alert("Password does not match confirmation!")
      return
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
        role: 'listener'
      })
    }

    let response = await fetch(url, request)

    if (response.ok) {
      setSent(true)
    } else {
      alert(response.statusText)
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
