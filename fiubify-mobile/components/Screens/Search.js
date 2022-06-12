import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";

import axios from "axios";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getSongsWith } from "../../src/fetchSongs";
import { AllProfiles } from "./AllProfiles";

async function getProfilesWith(name) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/user?name=${name}`,
    );
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
    return { data: [] }
  }
}

export function Search({
                         navigation,
                         setSong,
                         currentUserId,
                         setOtheruid,
                         token,
                       }) {
  const [songs, setSongs] = useState([]);
  const [searchBy, setSearchBy] = useState(undefined);
  const [startSearch, setStartSearch] = useState(false);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongsWith(searchBy);
      const fetchedProfiles = await getProfilesWith(searchBy);
      setSongs(fetchedSongs.data);
      setProfiles(fetchedProfiles.data)
    }

    if (startSearch) {
      aux().then(() => {
        setStartSearch(false);
      })
    }
  }, [startSearch]);

  return (
    <View style={styles.view}>
      <View style={styles.searchBar}>
        <UiTextInput
          style={styles.textInput}
          placeholder="Search by artist, song, etc"
          onChange={(text) => setSearchBy(text)}
        ></UiTextInput>
        <UiButton
          pressableStyle={styles.button}
          title={<Text>Search</Text>}
          onPress={() => setStartSearch(true)}
        ></UiButton>
      </View>
      <AllSongs setSong={setSong} songs={songs} />
      <AllProfiles
        profiles={profiles}
        currentUserId={currentUserId}
        navigation={navigation}
        setOtheruid={setOtheruid}
        token={token}
      />
    </View>
  );
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
  searchBar: {
    width: "100%",
    marginTop: hp(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#006E95",
  },
});
