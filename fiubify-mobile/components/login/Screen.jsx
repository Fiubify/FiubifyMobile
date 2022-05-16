import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import PasswordRecovery from './PasswordRecovery.jsx'

import UiButton from '../ui/UiButton.jsx'

function MainComponent(props) {
  if (props.currentForm === 'LOGIN') {
    return (
      <View>
        <LoginForm setUid={props.setUid} />
        <PasswordRecovery/>
        <UiButton
          title="SIGN UP"
          onPress={props.openRegistration}
        />
      </View>
    )
  } else if (props.currentForm === 'REGISTRATION') {
    return (
      <View>
        <RegistrationForm
          setUid={props.setUid}
          uid={props.uid}
          backFunction={props.closeRegistration}
        />
      </View>
    )
  }
}

function LoginScreen({setUid, uid}) {
  const [currentForm, setCurrentForm] = useState('LOGIN')
  return (
    <MainComponent
      setUid={setUid}
      uid={uid}
      currentForm={currentForm}
      openRegistration={() => setCurrentForm('REGISTRATION')}
      closeRegistration={() => setCurrentForm('LOGIN')}
    />
  )
}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15
  },
  register_button: {
    margin: 10
  }
});

export default LoginScreen
