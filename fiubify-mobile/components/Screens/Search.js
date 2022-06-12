import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";

import axios from "axios";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getSongsWithGenre, getSongsWithTitle } from "../../src/fetchSongs";
import { AllProfiles } from "./AllProfiles";

// TODO: Poner el token en el body
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
  // TODO: Setear los profiles correctamente
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = [];
      const fetchedSongsByTitle = await getSongsWithTitle(searchBy);
      const fetchedSongsByGenre = await getSongsWithGenre(searchBy);
      const fetchedProfiles = await getProfilesWith(searchBy);
      fetchedSongs.push.apply(fetchedSongs, fetchedSongsByTitle.data);
      fetchedSongs.push.apply(fetchedSongs, fetchedSongsByGenre.data);
      setSongs(fetchedSongs);
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

Array.prototype.extend = function (other_array) {
  /* You should include a test to check whether other_array really is an array */
  other_array.forEach(function(v) {this.push(v)}, this);
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
