import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import React from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Selector from "../ui/UiSelect";
import { BASE_URL } from "../../constantes";
import { navigateToHome, navigateToMyProfile } from "../../src/navigates";

export function AlbumForm({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("");
  const tiers = ["Free", "Premium"];
  const [genre, setGenre] = useState("");
  const [_newGenre, setNewGenre] = useState("");
  const [genres, _setGenres] = useState([
    "Clásica",
    "Country",
    "Cumbia",
    "Electrónica",
    "Electro Pop",
    "Hard Rock",
    "Heavy Metal",
    "Hip Hop",
    "Jazz",
    "Pop",
    "Rap",
    "Reggae",
    "Rock",
    "Tango",
    "Trap",
    "Other",
  ]);

  const { userUId, token } = route.params;

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() =>
          navigateToMyProfile(userUId, token, navigation)
        }
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Create your album</Text>
      <UiTextInput
        style={styles.text_input}
        onChange={setTitle}
        placeholder="Title"
      />
      <Selector
        data={tiers}
        placeholder="Tier"
        setValue={setTier}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      <Selector
        data={genres}
        placeholder="Genre"
        setValue={setGenre}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      {genre === "Other" && (
        <UiTextInput
          style={styles.text_input}
          onChange={setNewGenre}
          placeholder="Insert New Genre"
        />
      )}
      <UiButton
        title="Upload"
        pressableStyle={styles.upload}
        onPress={() => {
          send(token, title, userUId, tier, genre, navigation);
        }}
      />
    </View>
  );

  async function send(token, title, userUId, tier, genre, navigation) {
    let url =
      `${BASE_URL}/contents/albums`;

    const body = {
      token,
      title,
      artistId: userUId,
      tier,
      genre,
    };
    let request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    let response = await fetch(url, request);

    if (response.ok) {
      const body = (await response.json()).data;
      navigateToHome(userUId, token, navigation)
    } else {
      console.error(await response.json());
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
    backgroundColor: "#CAE3EA",
  },
  text_input: {
    marginBottom: hp(2),
  },
  upload: {
    backgroundColor: "#006E95",
  },
  title: {
    fontSize: 40,
    color: "#006E95",
    fontWeight: "bold",
    marginBottom: hp(4),
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
  value: {
    width: wp(90),
    marginBottom: hp(2),
    paddingVertical: 10,
    paddingHorizontal: wp(5),
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
  },
  labelContainerStyle: {
    width: wp(85),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
});
