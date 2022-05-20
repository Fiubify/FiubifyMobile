import React, { Component, useState } from 'react'
import { StyleSheet, Text } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

import PasswordRecoveryForm from './PasswordRecoveryForm.jsx'

export default function PasswordRecovery(props) {
  const [toggled, setToggled] = useState(false)

  if (toggled) {
    return <PasswordRecoveryForm/>
  } else {
    return (
      <Text style={styles.link} onPress={() => setToggled(true)}>
        Too stupid to remember a password?
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15
  }
});
