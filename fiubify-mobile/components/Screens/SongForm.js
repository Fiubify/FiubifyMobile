import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { getUser } from "../../src/GetUser";
import { uploadSong } from "../../src/reproducirCanciones";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";

// TODO
//  [] Que se guarde en albumId el id del album que se selecciona (Modificar Select)
//  [] Que se envie el albumId verdadero al back
//  [] Quitar el albumId del form
//  [] Modificar la url de la cancion para que se adapte al album (songUrl)

export function SongForm({ userUId, token, setCurrentScreen }) {
  const [title, setTitle] = useState("");
  const [albums, setAlbums] = useState([])
  const [albumId, setAlbumId] = useState("");
  const [duration, setDuration] = useState("");
  const [tier, setTier] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function aux() {
      const user = await getUser(userUId)
      const albumsData = await axios.get(`https://fiubify-middleware-staging.herokuapp.com/contents/albums?artistId=${user._id}`)
      console.log(albumsData)
      setAlbums(albumsData.data.data)
      setLoading(false)
    }
    aux().then()
  }, [])

  return loading || (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() =>
          navigation.navigate("Profile", {
            userUId: userUId,
          })
        }
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
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
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={albums?.map((album) => {
          return {label: album.title, value: "TODO: some value"}
        })}
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setDuration}
        placeholder="Duration"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setTier}
        placeholder="Tier"
      />
      <Selector
        data={genres}
        placeholder="Genre"
        setValue={setGenre}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      <UiButton
        title="Upload"
        pressableStyle={styles.upload}
        onPress={() => {
          send(
            token,
            title,
            userUId,
            albumId,
            duration,
            tier,
            description,
            genre,
            navigation
          );
        }}
      />
    </View>
  );

  async function send(
    token,
    title,
    userUId,
    albumId,
    duration,
    tier,
    description,
    genre,
    navigation
  ) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/contents/songs";

    const songUrl = `${userUId}/628ecc871a89da40fa02745c/${title}`;

    const userData = await getUser(userUId);
    await uploadSong(songUrl);
    // title, artistId, albumId, duration, url, tier, genre, description
    const body = {
      title,
      token,
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
      navigation.navigate("Home", {
        uid: userUId,
      });
    } else {
      console.log(await response.json());
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
});

export default SongForm;
