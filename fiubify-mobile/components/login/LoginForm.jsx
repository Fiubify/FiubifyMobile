import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logIn } from "../../state/actions/login.js";

import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function LoginForm({ actions, setUid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
        onPress={() => send(email, password, actions.logIn, setUid)}
      />
    </View>
  );

  async function send(email, password, logInAction, setUid) {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        setUid(user.uid);
      }).catch(error => {
      alert(error.message);
    });
  }
}

const mapStateToProps = state => {
  return ({ logged_in: state.loginState.logged_in });
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators({ logIn }, dispatch) };
};

const styles = StyleSheet.create({
  text_input: {
    marginBottom: 10,
  },
  link: {
    fontWeight: "bold",
    color: "blue",
    marginTop: 5,
    marginBottom: 15,
  },
  register_button: {
    margin: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
