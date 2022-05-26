import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import UiButton from "../ui/UiButton";
import axios from "axios";

async function getSongs() {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/songs`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

function AllSongs() {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongs();
      console.log(fetchedSongs);
      setSongs(fetchedSongs.data);
    }

    aux().then();
  }, []);
  if (songs) {
    return <View>

      {songs.map((song) => <UiButton key={song.title + song.artistId} title={song.title}></UiButton>)}

    </View>;
  } else {
    return <View><Text>WAITING</Text></View>
  }
}

function Home() {

  return <View style={{
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "70%",
  }}>
    <AllSongs />
  </View>;
}

const styles = StyleSheet.create({});

export default Home;
