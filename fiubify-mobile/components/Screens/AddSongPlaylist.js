import { StyleSheet, Text, View } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";
import { useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useEffect } from "react";
import { getSongsWithTitle } from "../../src/fetchContent";
import axios from "axios";
import { BASE_URL } from "../../constantes";
import { goToScreenPlaylistView } from "../../src/navigates";

function addSongToPlaylist(trackId, token, playlist, setCurrentScreen, setData) {
  axios.post(`${BASE_URL}/contents/playlists/${playlist._id}/add-track`, {trackId, token}).then(({data}) => {
    goToScreenPlaylistView(setData, setCurrentScreen, playlist)
  }).catch((e) => {
    console.error(e)
    alert("NO SE PUDO AÑADIR LA CANCION")
  })
}

export function AddSongPlaylist({ setData, data, token, currentUserId, setCurrentScreen }) {
  const { playlist } = data;
  const [searchBy, setSearchBy] = useState(undefined)
  const [startSearch, setStartSearch] = useState(false)
  const [songs, setSongs] = useState([])

  useEffect(() => {
    function fetchSongs() {
      return getSongsWithTitle(searchBy)
    }

    if (startSearch) {
      fetchSongs().then(({ data }) => {
        setSongs(data)
        setStartSearch(false);
      });
    }
  }, [startSearch]);

  return <View style={styles.view}>
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
    <AllSongs setSong={(song) => {
      addSongToPlaylist(song._id, token, playlist, setCurrentScreen, setData)
    }} songs={songs} currentUserUId={currentUserId} token={token}/>
  </View>;
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
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  filterButtons: {
    width: "100%",
    height: hp(15),
  },
});
