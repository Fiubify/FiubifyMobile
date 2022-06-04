import React from "react";
import { StyleSheet, TextInput } from "react-native";

function UiTextInput({ onChange, placeholder, secure, style }) {
  return (
    <TextInput
      style={[styles.text_input, style]}
      placeholder={placeholder}
      placeholderTextColor={"#006E95"}
      secureTextEntry={secure || false}
      onChangeText={onChange}
      backgroundColor="#fff"
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  text_input: {
    width: "90%",
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "white",
    color: "#006E95",
    fontSize: 19,
  },
});

export default UiTextInput;
