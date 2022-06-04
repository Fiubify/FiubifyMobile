import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { getUser } from "../../src/GetUser";
import { uploadSong } from "../../src/reproducirCanciones";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export function SongForm({ userUId, setCurrentScreen }) {
  const [title, setTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [duration, setDuration] = useState("");
  const [tier, setTier] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  return (
    <View style={styles.view}>
      <Text style={styles.title}>Upload Your Song</Text>
      <UiTextInput
        style={styles.text_input}
        onChange={setTitle}
        placeholder="Title"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setDescription}
        placeholder="Description"
      />
      {/* Tiene que ser DROPDOWN*/}
      <UiTextInput
        style={styles.text_input}
        onChange={setAlbumId}
        placeholder="Album"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setDuration}
        placeholder="duration"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setTier}
        placeholder="Tier"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setGenre}
        placeholder="Genre"
      />
      <UiButton
        title="Upload"
        pressableStyle={styles.upload}
        onPress={() => {
          send(
            title,
            userUId,
            albumId,
            duration,
            tier,
            description,
            genre,
            setCurrentScreen
          );
        }}
      />
    </View>
  );

  async function send(
    title,
    userUId,
    albumId,
    duration,
    tier,
    description,
    genre,
    setCurrentScreen
  ) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/contents/songs";

    const songUrl = `${userUId}/628ecc871a89da40fa02745c/${title}`;

    const userData = await getUser(userUId);
    await uploadSong(songUrl);
    // title, artistId, albumId, duration, url, tier, genre, description
    const body = {
      title,
      artistId: userData._id,
      albumId: "628ecc871a89da40fa02745c",
      duration: parseInt(duration),
      url: songUrl,
      tier,
      genre,
      description,
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
      console.log(`CANCION CREADA CON URL: ${songUrl}`);
      setCurrentScreen("HOME");
    } else {
      console.log(await response.json());
      alert(response.statusText);
    }
  }
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
});

export default SongForm;
