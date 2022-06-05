import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

function UiButton({ onPress, pressableStyle, textStyle, title }) {
  return (
    <Pressable
      style={[styles.pressable, pressableStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

export default UiButton;
