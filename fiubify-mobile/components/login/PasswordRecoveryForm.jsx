import React, { Component, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

export default function PasswordRecoveryForm(props) {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState("")

  if (!sent) {
    return (
      <View style={{display: 'block ruby'}}>
        <UiTextInput
          onChange={setEmail}
          placeholder="E-mail"
          style={styles.text_input}
        />
        <UiButton
          title="SEND"
          onPress={() => send(email)}
          pressableStyle={styles.button_pressable}
          textStyle={styles.button_text}
        />
      </View>
    )
  } else {
    return (
      <Text style={styles.text}> 
        An account recovery link has been sent to your e-mail account 
      </Text>
    )
  }

  async function send(email) {
    debugger
    const auth = getAuth()
    let response = await sendPasswordResetEmail(auth, email)

    setSent(true)
  }
}

const styles = StyleSheet.create({
  text: {
    width: 220,
    margin: 15
  },
  text_input: {
    width: 155,
    marginTop: 10,
    marginRight: 5,
    height: 35
  },
  button_pressable: {
    backgroundColor: 'blue', 
    marginTop: 5,
    marginBottom: 10,
    width: 20,
    height: 35
  }
})
