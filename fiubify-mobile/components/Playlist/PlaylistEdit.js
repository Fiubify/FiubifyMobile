import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import UiTextInput from "../ui/UiTextInput";
import { Switch } from "react-native-paper";
import UiButton from "../ui/UiButton";
import React, { useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";

async function editPlaylist(
  title,
  description,
  collaborative,
  playlistId,
  token,
  whenDone
) {
  const body = {
    title,
    token,
    description,
    collaborative,
  };
  try {
    const response = await axios.post(
      `https://fiubify-middleware-staging.herokuapp.com/contents/playlists/${playlistId}/edit`,
      body
    );
    whenDone();
  } catch (e) {
    console.error(e);
  }
}

export function PlaylistEdit({ route, navigation }) {
  const { uid, token, playlist } = route.params;
  const [title, setTitle] = useState(playlist.title);
  const [description, setDescription] = useState(playlist.description);
  const [collaborative, setCollaborative] = useState(playlist.collaborative);

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigation.navigate("Home", { uid, token })}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Create your playlist</Text>
      <UiTextInput
        style={styles.text_input}
        onChange={setTitle}
        value
        defaultValue={title}
        placeholder="Title"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setDescription}
        defaultValue={description}
        placeholder="Description"
      />
      <View style={styles.collaborativeSection}>
        <Text style={styles.collaborative}>Collaborative</Text>
        <Switch
          value={collaborative ? true : false}
          onValueChange={() => {
            setCollaborative(!collaborative);
          }}
          color="#006E95"
          style={styles.switch}
        />
      </View>
      <UiButton
        title="Update"
        pressableStyle={styles.upload}
        onPress={() => {
          editPlaylist(
            title,
            description,
            collaborative,
            playlist._id,
            token,
            () => {
              navigation.navigate("Home", { uid, token });
            }
          ).then();
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
    width: wp(44),
    marginBottom: hp(2),
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
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
  collaborativeSection: {
    width: "90%",
    marginBottom: "2%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  collaborative: {
    color: "#006E95",
    fontSize: 18,
    fontWeight: "bold",
  },
  switch: {},
});
