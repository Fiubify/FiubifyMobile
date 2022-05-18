import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "./components/login/Screen.jsx";
import MainScreen from "./components/MainScreen";
function LoginDispatcher() {
  const [uid, setUid] = useState('')
  if (uid === '') {
    return <LoginScreen setUid={setUid} uid={uid}/>
  } else {
    return <MainScreen uid={uid}/> // App
  }
}

function Fiubify() {
  return (
    <View style={styles.container}>
      <LoginDispatcher />
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
