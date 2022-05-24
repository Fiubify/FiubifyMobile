import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./components/MainScreen.jsx";

function Fiubify() {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Fiubify;
