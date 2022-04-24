import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Login from './components/login/Screen.jsx'

class App extends Component {
  state = {
    logged_in: false
  }

  render() {
    return (
      <View style={styles.container}>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App
