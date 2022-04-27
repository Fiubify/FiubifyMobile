import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'
import UiButton from '../ui/UiButton.jsx'

class Login extends Component {
  render() {
    return (
      <View>
        <LoginForm/>
        <Text style={styles.link} onPress={this.openAccountRecovery}>
          Too stupid to remember a password?
        </Text>
        <UiButton
          title="REGISTER"
          onPress={this.openRegister}
        />
      </View>
    );
  }

  openAccountRecovery() {
    console.log("lol")
  }

  openRegister() {
    console.log("emit")
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
