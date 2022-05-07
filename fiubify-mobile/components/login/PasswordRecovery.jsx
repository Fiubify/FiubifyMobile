import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

import PasswordRecoveryForm from './PasswordRecoveryForm.jsx'

function MainComponent(props) {
  if (props.toggled) {
    return <PasswordRecoveryForm/>
  } else {
    return (
      <Text style={styles.link} onPress={props.onClick}>
        Too stupid to remember a password?
      </Text>
    )
  }
}

class PasswordRecovery extends Component {
  constructor(props) {
    super(props)

    this.state = {
      toggled: false
    }

    this.toggleRecovery = this.toggleRecovery.bind(this)
  }

  render() {
    return (
      <MainComponent 
        toggled={this.state.toggled} 
        onClick={this.toggleRecovery}
      />
    )
  }

  toggleRecovery() {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }))
  }

}

const styles = StyleSheet.create({
  link: {
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5,
    marginBottom: 15
  }
});

export default PasswordRecovery