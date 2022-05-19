import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "./components/login/Screen.jsx";
import MainScreen from "./components/MainScreen";

import Profile from "./components/profile/Profile";

function LoginDispatcher(props) {
  const [uid, setUid] = useState("");
  if (uid === "") {
    return <MainScreen />;
    // return <LoginScreen setUid={setUid} uid={uid}/>
  } else {
    return <Profile userId={uid}></Profile>; // App
  }
}

function Fiubify() {
  return (
    <View style={styles.container}>
      <LoginDispatcher />
    </View>
  );
}

const mapStateToProps = (state) => {
  return { logged_in: state.loginState.logged_in };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(mapStateToProps)(Fiubify);
