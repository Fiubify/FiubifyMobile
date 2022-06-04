import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  link: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
    marginBottom: 15,
  },
  register_button: {
    margin: 10,
  },
});

export default LoginScreen;
