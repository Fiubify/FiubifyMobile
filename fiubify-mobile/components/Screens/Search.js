import {View, Text} from "react-native"
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";

import axios from "axios";

async function getSongsWith(title) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/songs?title=${title}`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export function Search({ setCurrentScreen, setSong }) {
  const [songs, setSongs] = useState([])
  const [searchBy, setSearchBy] = useState(undefined)
  const [startSearch, setStartSearch] = useState(false)

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongsWith(searchBy);
      console.log(fetchedSongs);
      setSongs(fetchedSongs.data);
    }

    if (startSearch) {
      console.log(searchBy)
      aux().then();
      setStartSearch(false)
    }
  }, [startSearch]);

  return <View>
    <UiTextInput placeholder="Search by artist, song, etc" onChange={(text) => setSearchBy(text)}></UiTextInput>
    <UiButton title="Search" onPress={() => setStartSearch(true)}></UiButton>
    <AllSongs setSong={setSong} songs={songs} />
  </View>;
}
