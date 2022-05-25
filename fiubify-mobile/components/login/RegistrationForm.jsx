import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import UiTextInput from "../ui/UiTextInput.jsx";
import UiButton from "../ui/UiButton.jsx";
import Profile from "../profile/Profile";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesomeFive from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RadioButton } from "react-native-paper";

export default function RegistrationForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [terms, setTerms] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const today = new Date();

  return (
    <View style={styles.view}>
      <Text style={styles.link} onPress={() => navigation.navigate('Entry')}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <UiButton
        title="Log in with Facebook"
        pressableStyle={styles.facebookButton}
      />

      <View style={styles.middle}>
        <View style={styles.line} />
        <Text style={styles.text}>or</Text>
        <View style={styles.line} />
      </View>

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

      <View style={styles.birthday}>
        <Text style={styles.birthdayText}>Date of Birth</Text>
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



  async function send(email, password, passwordRepeat, name, surname, birthDate, navigation) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/auth/register-email";

    if (password != passwordRepeat) {
      alert("Password does not match confirmation!");
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
        role: "Listener",
        name: name,
        surname: surname,
        birthDate: birthDate.toJSON(),
        plan: "Free",
      }),
    };

    let response = await fetch(url, request);

    if (response.ok) {
      const body = (await response.json()).data;
      navigation.navigate('Profile', {
        userId: body.uid
      })
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
    fontSize: 16,
    color: "#006E95",
  },
  terms: {
    marginVertical: hp(2),
    padding: 0,
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
