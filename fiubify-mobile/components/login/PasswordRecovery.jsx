import React, { Component } from "react";
import { StyleSheet, Text } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

import PasswordRecoveryForm from "./PasswordRecoveryForm.jsx";

function MainComponent(props) {
  if (props.toggled) {
    return <PasswordRecoveryForm />;
  } else {
    return (
      <Text style={styles.link} onPress={props.onClick}>
        Forgot password?
      </Text>
    );
  }
}
class PasswordRecovery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggled: false,
    };

    this.toggleRecovery = this.toggleRecovery.bind(this);
  }

  render() {
    return (
      <MainComponent
        toggled={this.state.toggled}
        onClick={this.toggleRecovery}
      />
    );
  }

  toggleRecovery() {
    this.setState((prevState) => ({
      toggled: !prevState.toggled,
    }));
  }
}
const styles = StyleSheet.create({
  link: {
    width: widthPercentageToDP(50),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginTop: heightPercentageToDP(2),
    textAlign: "center",
  },
});
export default PasswordRecovery;
