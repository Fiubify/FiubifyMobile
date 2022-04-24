import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

class LoginForm extends Component {
  render() {
    return (
      <View>
        <UiTextInput
          style={styles.text_input}
          placeholder="Username or e-mail"
        />
        <UiTextInput
          style={styles.text_input}
          placeholder="Password"
          secure={true}
        />
        <UiButton
          title="LOG IN"
          onPress={this.sendLogInForm}
        />
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

  sendLogInForm() {
    console.log("send")
  }

  openAccountRecovery() {
    console.log("lol")
  }

  openRegister() {
    console.log("emit")
  }
}

const styles = StyleSheet.create({
  text_input: {
    marginBottom: 10,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
    margin: 5
  },
  register_button: {
    margin: 10
  }
});

export default LoginForm
