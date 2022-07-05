import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BASE_URL } from "../../constantes";
import { navigateToHome } from "../../src/navigates";
import Selector from "../ui/UiSelect";

async function editAlbum(title, plan, genre, albumId, token, whenDone) {
  let url = `${BASE_URL}/contents/albums/${albumId}/`;

  const body = {
    title,
    tier: plan,
    genre,
    token,
  };

  let request = {
    method: "PUT",
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

export function AlbumEdit({ route, navigation }) {
  const { uid, token, album } = route.params;
  const [title, setTitle] = useState(album.title);
  const [plan, setPlan] = useState(album.tier);
  const [genre, setGenre] = useState(album.genre);
  const [_newGenre, setNewGenre] = useState(album.genre);
  const plans = ["Free", "Premium"];
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

  function getGenre() {
    var found = false;
    genres.map((g) => {
      if (g === genre) {
        found = true;
      }
    });
    if (found) {
      return genre;
    } else {
      setGenre("Other");
      return "Other";
    }
  }

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigateToHome(uid, token, navigation)}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Edit your Album</Text>
      <UiTextInput
        style={styles.text_input}
        onChange={setTitle}
        value
        defaultValue={title}
        placeholder="Title"
      />
      <Selector
        data={plans}
        defaultValue={plan}
        placeholder="Plan"
        setValue={setPlan}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      <Selector
        data={genres}
        placeholder="Genre"
        defaultValue={getGenre()}
        setValue={setGenre}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      {genre === "Other" && (
        <UiTextInput
          style={styles.text_input}
          onChange={setNewGenre}
          defaultValue={_newGenre}
        />
      )}
      <UiButton
        title="Update"
        pressableStyle={styles.upload}
        onPress={() => {
          var finalGenre;
          genre === "Other" ? (finalGenre = _newGenre) : (finalGenre = genre);
          editAlbum(title, plan, finalGenre, album._id, token, () => {
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
  upload: {
    backgroundColor: "#006E95",
  },
  value: {
    width: wp(90),
    marginBottom: hp(2),
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
  },
  labelContainerStyle: {
    width: wp(80),
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
});
