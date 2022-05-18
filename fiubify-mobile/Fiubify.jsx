import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import LoginScreen from "./components/login/Screen.jsx";
import MainScreen from "./components/MainScreen";
import * as DocumentPicker from 'expo-document-picker';
import { uploadBytes, ref } from "firebase/storage";
import { db } from "./firebase";

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
      <Button
        title="open picker for single file selection"
        onPress={async () => {
          try {
            const pickerResult = await DocumentPicker.getDocumentAsync()
            const response = await fetch(pickerResult.uri)
            const file = await response.blob()
            const dbRef = ref(db, 'songs/bob-esponja')
            const snapshot = await uploadBytes(dbRef, file)
          } catch (e) {
            console.error(e)
          }
        }}
      />
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
