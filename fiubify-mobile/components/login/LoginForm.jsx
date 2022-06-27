import React, { useEffect, useState } from "react";
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
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { postUserEvent } from "../../src/fetchMetrics";
import { BASE_URL, federatedTypeAction, emailTypeAction, loginAction, signupAction } from "../../constantes";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { getUser } from "../../src/GetUser";
import { navigateToEntry, navigateToForgotPassword, navigateToHome, navigateToRegistration } from "../../src/navigates";

WebBrowser.maybeCompleteAuthSession();

function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '437257657611-5j4la8i9bso6d9pvtbjj4tihgsq5057v.apps.googleusercontent.com',
    },
  );

  useEffect(() => {
    if (response?.type === 'success') {

      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential).then(async (userCredentials) => {
        const user = userCredentials.user;

        try {
          await getUser(user.uid);
          await postUserEvent(loginAction, federatedTypeAction, user.uid);
        } catch {
          await sendRegistration(user.email, user.uid, user.displayName);
          await postUserEvent(signupAction, federatedTypeAction, user.uid);
          await postUserEvent(loginAction, federatedTypeAction, user.uid);
        }

        const token = await user.getIdToken()
        navigateToHome(user.uid, token, navigation);
      });
    }
  })

  return (
    <View style={styles.view}>
      <Text style={styles.link} onPress={() => navigateToEntry(navigation)}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <View style={styles.acountsButtonsView}>
        <UiButton
          title="Log in with Facebook"
          pressableStyle={styles.facebookButton}
        />
        {/* Si se loggea con fb, postear metrica (Login, Federated)*/}
        <UiButton
          title="Log in with Google"
          pressableStyle={styles.googleButton}
          onPress={() => {
            promptAsync().then();
          }}
        />
        {/* Si se loggea con google, postear metrica (Login, Federated)*/}
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
        onPress={() => navigateToForgotPassword(navigation)}
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
        onPress={() => navigateToRegistration()}
      />
    </View>
  );

  async function send(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        const token = await user.getIdToken()
        await postUserEvent(loginAction, emailTypeAction, user.uid);
        navigateToHome(user.uid, token, navigation);
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

async function sendRegistration(
  email,
  uid,
  displayName
) {
  const [name, surname] = displayName.split(' ')
  let url =
    `${BASE_URL}/auth/register-provider`;

  let request = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      role: "Listener",
      name,
      surname,
      plan: "Free",
      uid
    }),
  };

  let response = await fetch(url, request);

  if (response.ok) {
    return true;
  } else {
    alert(response.statusText);
  }
}

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
