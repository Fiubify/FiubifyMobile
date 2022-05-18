import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import LoginScreen from "./components/login/Screen.jsx";
import Profile from "./components/profile/Profile";

function LoginDispatcher(props) {
  const [uid, setUid] = useState('')
  if (uid === '') {
    return <LoginScreen setUid={setUid} uid={uid}/>
  } else {
    return <Profile userId={uid}></Profile> // App
  }
}

function Fiubify(props) {
  return (
    <View style={styles.container}>
      <LoginDispatcher logged_in={props.logged_in} />
    </View>
  );
}

const mapStateToProps = state => {
  return({logged_in: state.loginState.logged_in})
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps)(Fiubify)
