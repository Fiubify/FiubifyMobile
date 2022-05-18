import React, { Component, useState } from "react";
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import PasswordRecovery from './PasswordRecovery.jsx'

import UiButton from '../ui/UiButton.jsx'

function MainComponent({ closeRegistration, currentForm, openRegistration, setUid, uid }) {
  if (currentForm === 'LOGIN') {
    return (
      <View>
        <LoginForm setUid={setUid} />
        <PasswordRecovery/>
        <UiButton
          title="SIGN UP"
          onPress={openRegistration}
        />
      </View>
    )
  } else if (currentForm === 'REGISTRATION') {
    return (
      <View>
        <RegistrationForm
          setUid={setUid}
          backFunction={closeRegistration}
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
