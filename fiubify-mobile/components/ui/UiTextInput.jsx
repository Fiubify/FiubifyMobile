import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

class UiTextInput extends Component {
  render() {
    return (
      <TextInput
        style={[styles.text_input, this.props.style]}
        placeholder={this.props.placeholder}
        placeholderTextColor={"#006E95"}
        secureTextEntry={this.props.secure || false}
        onChangeText={this.props.onChange}
        backgroundColor="#fff"
      ></TextInput>
    );
  }
}

const styles = StyleSheet.create({
  text_input: {
    width: "90%",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "white",
    color: "#006E95",
    fontSize: 19,
  },
});

export default UiTextInput;
