import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

function MainComponent(props) {
  if (!props.sent) {
    return (
      <View style={{display: 'block ruby'}}>
        <UiTextInput
          placeholder="E-mail"
          style={styles.text_input}
        />
        <UiButton
          title="SEND"
          onPress={props.onSend}
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
}

class PasswordRecoveryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sent: false
    }

    this.send = this.send.bind(this)
  }

  send() {
    // TODO: Enviar a backend

    this.setState(prevState => ({
      sent: true
    }))
  }

  render() {
    return (
      <MainComponent
        sent={this.state.sent}
        onSend={this.send}
      />
    )
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

export default PasswordRecoveryForm