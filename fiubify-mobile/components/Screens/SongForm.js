import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { uploadSong } from "../../src/reproducirCanciones";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Selector from "../ui/UiSelect";


export function SongForm({ navigation, route }) {
  const { userUId, token } = route.params;
  const [title, setTitle] = useState("");
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [duration, setDuration] = useState("");
  const [tier, setTier] = useState("");
  const [description, setDescription] = useState("");
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
  const [loading, setLoading] = useState(true);
  const tiers = ["Free", "Premium"];

  useEffect(() => {
    axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/albums?artistId=${userUId}`,
    ).then((albumsData) => {
      setAlbums(albumsData.data.data);
      setLoading(false);
    }).catch((e) => {
      console.error(e)
    })
  }, []);

    if(loading)
      return (<View style={styles.view}>
        <Text style={styles.loading}>Loading...</Text>
      </View>)
    return (
      <View style={styles.view}>
        <Text
          style={styles.link}
          onPress={() =>
            navigation.navigate("MyProfile", {
              userUId: userUId,
              token,
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
        <Selector
          data={albums}
          placeholder="Album"
          setValue={(album) => {
            return setAlbumId(album._id);
          }}
          valueStyle={styles.value}
          labelContainerStyle={styles.labelContainerStyle}
          itemSelection={(item) => item.title}
        />
        <UiTextInput
          style={styles.text_input}
          onChange={setDuration}
          placeholder="Duration"
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
            send(
              token,
              title,
              userUId,
              albumId,
              duration,
              tier,
              description,
              genre,
              navigation,
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
    navigation,
  ) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/contents/songs";

    const songUrl = `${userUId}/${albumId}/${title}`;

    await uploadSong(songUrl);
    // title, artistId, albumId, duration, url, tier, genre, description
    const body = {
      title,
      token,
      artistId: userUId,
      albumId,
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
      navigation.navigate("Home", {
        uid: userUId,
        token: token,
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
