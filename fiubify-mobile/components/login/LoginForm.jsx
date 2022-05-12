import React, { Component, useState } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logIn } from '../../state/actions/login.js'

import UiTextInput from '../ui/UiTextInput.jsx'
import UiButton from '../ui/UiButton.jsx'

function LoginForm(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return(
    <View>
      <UiTextInput
        onChange={setEmail}
        style={styles.text_input}
        placeholder="Username or e-mail"
      />
      <UiTextInput
        onChange={setPassword}
        style={styles.text_input}
        placeholder="Password"
        secure={true}
      />
      <UiButton 
        title="DONE"
        onPress={() => send(email, password, props.actions.logIn)}
      />
    </View>
  )

  async function send(email, password, logInAction) {
    let url = 'https://fiubify-middleware-staging.herokuapp.com/auth/validate'

    let request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }

    let response = await fetch(url, request)
    if (response.ok) {
      logInAction()
    } else {
      alert(response.statusText)
    }
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
