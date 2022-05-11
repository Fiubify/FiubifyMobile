import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn } from '../../state/actions/login.js'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

class LoginForm extends Component {
  render() {
    return (
      <View>
        <UiTextInput
          style={styles.text_input}
          placeholder="Username or e-mail"
        />
        <UiTextInput
          style={styles.text_input}
          placeholder="Password"
          secure={true}
        />
        <UiButton
          title="LOG IN"
          onPress={() => this.send()}
        />
      </View>
    );
  }

  send() {
    this.props.actions.logIn()
  }
}

const mapStateToProps = state => {
  return ({logged_in: state.loginState.logged_in})
}

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({logIn}, dispatch) }
} 

const styles = StyleSheet.create({
  text_input: {
    marginBottom: 10,
  },
  link: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15
  },
  register_button: {
    margin: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
