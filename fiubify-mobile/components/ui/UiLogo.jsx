import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

class UiLogo extends Component {
  render() {
    return (
      <Image
        style={[styles.logo, this.props.logoStyles]}
        source={require("./../../assets/logo.png")}
      />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: wp(80),
    height: wp(80),
  },
});

export default UiLogo;
