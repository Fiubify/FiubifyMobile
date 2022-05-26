import { useEffect, useState } from "react";
import Home from "./Home";
import Profile from "../profile/Profile";
import Header from "./Header";
import Footer from "./Footer";
import { StyleSheet, View, Text } from "react-native";
import UiButton from "../ui/UiButton";
import UiTextInput from "../ui/UiTextInput";
import React from "react";
import { uploadSong } from "../../src/reproducirCanciones";

function SongForm({ userUId, setCurrentScreen }) {
  const [title, setTitle] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [duration, setDuration] = useState("");
  const [tier, setTier] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  return (
    <View>
      <UiTextInput
        onChange={setTitle}
        placeholder="Title"
      />
      <UiTextInput
        onChange={setDescription}
        placeholder="Description"
      />
      {/* Tiene que ser DROPDOWN*/}
      <UiTextInput
        onChange={setAlbumId}
        placeholder="Album"
      />
      <UiTextInput
        onChange={setDuration}
        placeholder="duration"
      />
      <UiTextInput
        onChange={setTier}
        placeholder="Tier"
      />
      <UiTextInput
        onChange={setGenre}
        placeholder="Genre"
      />
      <UiButton
        title="Upload"
        onPress={() => {
          send(title, userUId, albumId, duration, tier, description, genre);
        }}
      />
    </View>
  );

  async function send(title, userUId, albumId, duration, tier, description, genre) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/contents/songs";

    const songUrl = `${userUId}/${albumId}/${title}`;

    // await uploadSong(songUrl);
    // title, artistId, albumId, duration, url, tier, genre, description
    let request = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        artistId: userUId,
        albumId: "628ecc871a89da40fa02745c",
        duration: parseInt(duration),
        url: songUrl,
        tier,
        genre,
        description,
      }),
    };

    let response = await fetch(url, request);

    if (response.ok) {
      const body = (await response.json()).data;
      console.log(`CANCION CREADA CON URL: ${songUrl}`);
    } else {
      console.log(await response.json())
      alert(response.statusText);
    }
  }
}

function ScreenController({ route }) {
  const { uid } = route.params;
  const [currentScreen, setCurrentScreen] = useState("HOME");
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (currentScreen === "HOME") {
      setComponent(<Home setCurrentScreen={setCurrentScreen} />);
    } else if (currentScreen === "SEARCH") {
      setComponent(null);
    } else if (currentScreen === "LOAD-SONG") {
      setComponent(<SongForm userUId={uid} setCurrentScreen={setCurrentScreen} />);
    } else {
      setComponent(null);
    }
  }, [currentScreen]);

  if (currentScreen === "PROFILE") {
    return <Profile userUId={uid} setCurrentScreen={setCurrentScreen} />;
  } else
    return (
      <View style={styles.view}>
        <Header setCurrentScreen={setCurrentScreen} />
        {component}
        <Footer
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
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
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default ScreenController;
