import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { auth } from "../../firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { postUserEvent } from "../../src/fetchMetrics";
import { passwordAction, resetTypeAction } from "../../constantes";
import { getUserByEmail } from "../../src/fetchUsers";

export default function PasswordRecoveryForm({ navigation }) {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  if (!sent) {
    return (
      <View style={styles.view}>
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="arrow-back-ios" />
          Back
        </Text>
        <UiTextInput
          onChange={setEmail}
          placeholder="E-mail"
          style={styles.text_input}
        />
        <UiButton
          title="SEND"
          onPress={() => send(email)}
          pressableStyle={styles.button_pressable}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          <MaterialIcons name="arrow-back-ios" />
          Back
        </Text>
        <Text style={styles.text}>
          An account recovery link has been sent to your e-mail account
        </Text>
      </View>
    );
  }

  async function send(email) {
    sendPasswordResetEmail(auth, email)
      .then((response) => {
        setSent(true);
        getUserByEmail(email).then((user) => postUserEvent(passwordAction, resetTypeAction, user.uid));
      })
      .catch((error) => {
        alert(error.message);
      });
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
  text_input: {
    marginBottom: hp(2),
  },
  button_pressable: {
    backgroundColor: "#006E95",
  },
  text: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
    marginTop: hp(2),
    textAlign: "center",
  },
});
