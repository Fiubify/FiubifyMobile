import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

class RegistrationForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sent: false
    }

    this.send = this.send.bind(this)
  }

  render() {
    if (!this.state.sent) {
      return (
        <View>
          <Text style={styles.link} onPress={this.props.back}>
            Back
          </Text>
          <UiTextInput
            style={styles.text_input}
            placeholder="E-mail"
          />
          <UiTextInput
            style={styles.text_input}
            placeholder="Password"
            secure={true}
          />
          <UiTextInput
            style={styles.text_input}
            placeholder="Repeat password"
            secure={true}
          />
          <UiButton 
            title="DONE"
            onPress={this.send}
          />
        </View>
      )
    } else {
      return (
        <Text>You are registered</Text>
      )
    }
  }

  send() {
    this.setState(prevState => ({
      sent: true
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
  text_input: {
    marginBottom: 10,
  }
})

export default RegistrationForm