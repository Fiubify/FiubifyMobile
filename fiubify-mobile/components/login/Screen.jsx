import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'
import PasswordRecovery from './PasswordRecovery.jsx'

import UiButton from '../ui/UiButton.jsx'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentForm: 'LOGIN',
    }

    this.openRegistration = this.openRegistration.bind(this)
  }

  render() {
    return (
      <View>
        <LoginForm/>
        <PasswordRecovery/>
        <UiButton
          title="REGISTER"
          onPress={this.openRegister}
        />
      </View>
    );
  }

  openRegistration() {
    this.currentForm = 'REGISTER'
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