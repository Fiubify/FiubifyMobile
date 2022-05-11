import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux';

import LoginScreen from './components/login/Screen.jsx'

function MainScreen(props) {
  if (!props.logged_in) {
    return <LoginScreen/>
  } else {
    return <Text>You are logged in!</Text> // App
  }
}

class Fiubify extends Component {
  render() {
    return(
      <View style={styles.container}>
        <MainScreen logged_in={this.props.logged_in} />
      </View>
    )
  }
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
