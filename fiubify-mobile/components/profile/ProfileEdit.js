import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesomeFive from "react-native-vector-icons/FontAwesome5";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BASE_URL } from "../../constantes";
import { navigateToHome, navigateToMyProfile } from "../../src/navigates";
import Selector from "../ui/UiSelect";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

async function editProfile(
  name,
  surname,
  email,
  role,
  userUId,
  token,
  whenDone
) {
  let url = `${BASE_URL}/user/${userUId}`;
  const body = {
    email: email,
    role: role,
    name: name,
    surname: surname,
    token,
  };
  let request = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  };

  let response = await fetch(url, request);

  if (response.ok) {
    whenDone();
  } else {
    console.error(await response.json());
    alert(response.statusText);
  }
}

export function ProfileEdit({ route, navigation }) {
  const { uid, token, profile } = route.params;
  const [name, setName] = useState(profile.name);
  const [surname, setSurname] = useState(profile.surname);
  const [email, setEmail] = useState(profile.email);
  const [role, setRole] = useState(profile.role);
  const [birthDate, setBirthDate] = useState(
    profile.birthdate ? profile.birthdate : new Date()
  );
  const roles = ["Listener", "Artist"];
  const today = new Date();

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigateToMyProfile(uid, token, navigation)}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Edit your profile</Text>
      <UiTextInput
        defaultValue={name}
        onChange={setName}
        style={styles.text_input}
        placeholder="Your name"
      />
      <UiTextInput
        defaultValue={surname}
        onChange={setSurname}
        style={styles.text_input}
        placeholder="Your surname"
      />
      <UiTextInput
        defaultValue={email}
        onChange={setEmail}
        style={styles.text_input}
        placeholder="E-mail"
      />
      <Selector
        data={roles}
        placeholder="Role"
        defaultValue={role}
        setValue={setRole}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
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
      <UiButton
        title="Update"
        pressableStyle={styles.upload}
        onPress={() => {
          editProfile(name, surname, email, role, uid, token, () => {
            navigateToHome(uid, token, navigation);
          }).then();
        }}
      />
    </View>
  );
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
  upload: {
    marginTop: "5%",
    backgroundColor: "#006E95",
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
    width: wp(90),
    marginBottom: hp(2),
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
  },
  labelContainerStyle: {
    width: wp(90),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 40,
    color: "#006E95",
    fontWeight: "bold",
    marginBottom: hp(4),
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
});
