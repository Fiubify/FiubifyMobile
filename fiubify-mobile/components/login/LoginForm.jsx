import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from "../../state/actions/login.js";

import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function LoginForm({ navigation, openRegistration }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.view}>
      <Text style={styles.link} onPress={() => navigation.navigate("Entry")}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <View style={styles.acountsButtonsView}>
        <UiButton
          title="Log in with Facebook"
          pressableStyle={styles.facebookButton}
        />
        <UiButton
          title="Log in with Google"
          pressableStyle={styles.googleButton}
        />
      </View>
      <View style={styles.middle}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.inputs}>
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
          passwordInput={true}
        />
      </View>
      <View style={styles.logInSection}>
        <UiButton
          title="Log In"
          pressableStyle={styles.logIn}
          onPress={() => send(email, password)}
        />
      </View>
      <Text
        style={styles.forgot}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        Forgot password?
      </Text>
      <View style={styles.middle}>
        <View style={styles.line} />
      </View>

      <Text style={styles.text}>Don't have an account?</Text>
      <UiButton
        title="SIGN UP"
        pressableStyle={styles.SignUp}
        textStyle={styles.signUpText}
        onPress={() => navigation.navigate("Registration")}
      />
    </View>
  );

  async function send(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        navigation.navigate("Home", {
          uid: user.uid,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }
}

const mapStateToProps = (state) => {
  return { logged_in: state.loginState.logged_in };
};

const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators({ logIn }, dispatch) };
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  acountsButtonsView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookButton: {
    backgroundColor: "#004595",
    marginBottom: hp(2),
  },
  googleButton: {
    backgroundColor: "#950000",
  },
  middle: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: hp(2),
  },
  line: {
    backgroundColor: "#006E95",
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  text: {
    color: "#006E95",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 15,
    fontSize: 20,
    justifyContent: "center",
  },
  inputs: {
    width: wp(100),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logInSection: {
    width: wp(100),
    marginTop: hp(2),
    display: "flex",
    alignItems: "center",
  },
  logIn: {
    backgroundColor: "#006E95",
  },
  text_input: {
    marginBottom: hp(2),
  },
  link: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginBottom: hp(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  register_button: {
    margin: 10,
  },
  SignUp: {
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    marginTop: 20,
  },
  signUpText: {
    color: "#006E95",
  },
  forgot: {
    width: wp(50),
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#006E95",
    marginTop: hp(2),
    textAlign: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
