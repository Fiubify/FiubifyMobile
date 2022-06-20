import React from "react";
import { StyleSheet, TextInput } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

function UiTextInput({ onChange, placeholder, secure, style, defaultValue = undefined }) {
  return (
    <TextInput
      style={[styles.text_input, style]}
      placeholder={placeholder}
      placeholderTextColor={"#006E95"}
      secureTextEntry={secure || false}
      onChangeText={onChange}
      defaultValue={defaultValue}
      backgroundColor="#fff"
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  text_input: {
    width: "90%",
    paddingVertical: 10,
    paddingHorizontal: wp(7),
    borderRadius: 20,
    backgroundColor: "white",
    color: "#006E95",
    fontSize: 19,
  },
});

export default UiTextInput;
