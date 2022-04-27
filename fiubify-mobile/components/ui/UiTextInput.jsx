import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

function UiTextInput({onChange, style, placeholder, secure}) {
    return <TextInput
        style={[style, styles.text_input]}
        placeholder = {placeholder}
        secureTextEntry = {secure || false}
        backgroundColor = "#fff"
        onChangeText = {onChange}
      />
}

const styles = StyleSheet.create({
  text_input: {
    padding: 10,
    borderWidth: 1,
  },
});

export default UiTextInput
