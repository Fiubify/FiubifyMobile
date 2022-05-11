import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

class UiTextInput extends Component {
  render() {
    return (
      <TextInput
        style={[styles.text_input, this.props.style]}
        placeholder = {this.props.placeholder}
        secureTextEntry = {this.props.secure || false}
        onChangeText = {this.props.onChange}
        backgroundColor = "#fff"
      />
    )
  }
}

const styles = StyleSheet.create({
  text_input: {
    padding: 10,
    borderWidth: 1,
  },
});

export default UiTextInput
