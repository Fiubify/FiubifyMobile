import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

class UiButton extends Component {
  render() {
    return (
      <Pressable
        style={[styles.pressable, this.props.pressableStyle]}
        onPress={this.props.onPress}
      >
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.title}
        </Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  pressable: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
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
