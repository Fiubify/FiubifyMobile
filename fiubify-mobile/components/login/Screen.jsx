import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import LoginForm from './LoginForm.jsx'

class Login extends Component {
  render() {
    return (
      <View>
        <LoginForm/>
      </View>
    );
  }
}

export default Login