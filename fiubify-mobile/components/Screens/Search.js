import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";
import axios from "axios";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

async function getSongsWith(title) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/songs?title=${title}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export function Search({ setCurrentScreen, setSong }) {
  const [songs, setSongs] = useState([]);
  const [searchBy, setSearchBy] = useState(undefined);
  const [startSearch, setStartSearch] = useState(false);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongsWith(searchBy);
      console.log(fetchedSongs);
      setSongs(fetchedSongs.data);
    }

    if (startSearch) {
      console.log(searchBy);
      aux().then();
      setStartSearch(false);
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
