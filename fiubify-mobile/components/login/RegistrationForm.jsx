import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesomeFive from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";
import Selector from "../ui/UiSelect.jsx";
import { postUserEvent } from "../../src/fetchMetrics";
import {
  BASE_URL,
  emailTypeAction,
  loginAction,
  signupAction,
} from "../../constantes";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { navigateToEntry, navigateToHome } from "../../src/navigates";

export default function RegistrationForm({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState();
  const [plan, setPlan] = useState();
  const [birthDate, setBirthDate] = useState(new Date());
  const [terms, setTerms] = useState(false);
  const roles = ["Listener", "Artist"];
  const plans = ["Free", "Premium"];
  const today = new Date();

  return (
    <View style={styles.view}>
      <Text style={styles.link} onPress={() => navigateToEntry(navigation)}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <UiTextInput
        onChange={setName}
        style={styles.text_input}
        placeholder="Your name"
      />
      <UiTextInput
        onChange={setSurName}
        style={styles.text_input}
        placeholder="Your surname"
      />
      <UiTextInput
        onChange={setEmail}
        style={styles.text_input}
        placeholder="E-mail"
      />
      <UiTextInput
        onChange={setPassword}
        style={styles.text_input}
        placeholder="Password"
        secure={true}
      />
      <UiTextInput
        onChange={setPasswordRepeat}
        style={styles.text_input}
        placeholder="Repeat password"
        secure={true}
      />
      <View style={styles.pickers}>
        <Selector
          data={roles}
          placeholder="Role"
          setValue={setRole}
          valueStyle={styles.value}
          labelContainerStyle={styles.labelContainerStyle}
        />
        <Selector
          data={plans}
          placeholder="Plan"
          setValue={setPlan}
          valueStyle={styles.value}
          labelContainerStyle={styles.labelContainerStyle}
        />
      </View>
      <View style={styles.birthday}>
        <Text style={styles.birthdayText}>Date of Birth:</Text>
        <Text style={styles.birthdateText}>
          {birthDate?.toLocaleDateString()}
        </Text>
        <UiButton
          pressableStyle={styles.birthdayButton}
          onPress={() => {
            DateTimePickerAndroid.open({
              value: birthDate,
              onChange: (event, selectedDate) => setBirthDate(selectedDate),
              mode: "date",
              maximumDate: new Date(
                today.getFullYear() - 18,
                today.getMonth(),
                today.getDate()
              ),
            });
          }}
          title={
            <FontAwesomeFive name="calendar-day" size={20} color="#006E95" />
          }
        />
      </View>

      <View style={styles.terms}>
        <RadioButton
          value="terms"
          color="#006E95"
          uncheckedColor="#006E95"
          status={terms ? "checked" : "unchecked"}
          onPress={() => setTerms(!terms)}
        />
        <Text style={styles.terms_text}>
          I have read and agreed to the{" "}
          <Text style={styles.bold}>terms & conditions</Text>
        </Text>
      </View>

      <UiButton
        title="Sign Up"
        pressableStyle={styles.signUp}
        onPress={() => {
          if (terms) {
            send(
              email,
              password,
              passwordRepeat,
              name,
              surname,
              role,
              plan,
              birthDate,
              navigation
            );
          } else {
            alert("Please accept the terms & conditions");
          }
        }}
      />
    </View>
  );

  async function send(
    email,
    password,
    passwordRepeat,
    name,
    surname,
    role,
    plan,
    birthDate,
    navigation
  ) {
    let url = `${BASE_URL}/auth/register-email`;

    if (password !== passwordRepeat) {
      alert("Password does not match confirmation!");
      return;
    }

    if (!role) {
      alert("No role was selected");
      return;
    }

    if (!plan) {
      alert("No plan was selected");
      return;
    }

    let request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        role: role,
        name: name,
        surname: surname,
        birthDate: birthDate.toJSON(),
        plan: plan,
      }),
    };

    let response = await fetch(url, request);

    if (response.ok) {
      const body = (await response.json()).data;
      await postUserEvent(signupAction, emailTypeAction, body.uid);
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const user = userCredentials.user;
          const token = await user.getIdToken();
          await postUserEvent(loginAction, emailTypeAction, user.uid);
          navigateToHome(user.uid, token, navigation);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      alert(response.statusText);
    }
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookButton: {
    backgroundColor: "#004595",
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
  pickers: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    width: wp(44),
    marginBottom: hp(2),
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  labelContainerStyle: {
    width: wp(39),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
  birthday: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  birthdayButton: {
    width: wp(25),
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
  },
  birthdayText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
  birthdateText: {
    fontSize: 20,
    color: "#006E95",
  },
  terms: {
    marginVertical: hp(2),
    padding: 0,
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  terms_text: {
    color: "#006E95",
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  signUp: {
    backgroundColor: "#006E95",
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
    marginBottom: 10,
  },
});
