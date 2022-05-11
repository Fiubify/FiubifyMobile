import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'
import RegistrationForm from './RegistrationForm.jsx'
import PasswordRecovery from './PasswordRecovery.jsx'

import UiButton from '../ui/UiButton.jsx'

function MainComponent(props) {
  if (props.currentForm == 'LOGIN') {
    return (
      <View>
        <LoginForm/>
        <PasswordRecovery/>
        <UiButton
          title="SIGN UP"
          onPress={props.openRegistration}
        />
      </View>
    )
  } else if (props.currentForm == 'REGISTRATION') {
    return (
      <View>
        <RegistrationForm
          back={props.closeRegistration}
        />
      </View>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentForm: 'LOGIN',
    }

    this.openRegistration = this.openRegistration.bind(this)
    this.closeRegistration = this.closeRegistration.bind(this)
  }

  render() {
    return (
      <MainComponent
        currentForm={this.state.currentForm}
        openRegistration={this.openRegistration}
        closeRegistration={this.closeRegistration}
      />
    )
  }

  openRegistration() {
    this.setState(prevState => ({
      currentForm: 'REGISTRATION'
    }))
  }

  closeRegistration() {
    this.setState(prevState => ({
      currentForm: 'LOGIN'
    }))
  }

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

export default Login