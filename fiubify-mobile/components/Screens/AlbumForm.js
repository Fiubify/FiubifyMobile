import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getUser } from "../../src/GetUser";

export function AlbumForm({ userUId, token, setCurrentScreen }) {
  const [title, setTitle] = useState("");
  const [tier, setTier] = useState("");

  return (
    <View style={styles.view}>
      <Text style={styles.title}>Create your album</Text>
      <UiTextInput
        style={styles.text_input}
        onChange={setTitle}
        placeholder="Title"
      />
      <UiTextInput
        style={styles.text_input}
        onChange={setTier}
        placeholder="Tier"
      />
      <UiButton
        title="Upload"
        pressableStyle={styles.upload}
        onPress={() => {
          send(
            token,
            title,
            userUId,
            tier,
            setCurrentScreen
          );
        }}
      />
    </View>
  );

  async function send(
    token,
    title,
    userUId,
    tier,
    setCurrentScreen
  ) {
    let url = "https://fiubify-middleware-staging.herokuapp.com/contents/albums";

    const userData = await getUser(userUId);
    const body = {
      token,
      title,
      artistId: userData._id,
      tier,
    };
    console.log(body)
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
      console.log(`ALBUM CREADO: ${body}`);
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
