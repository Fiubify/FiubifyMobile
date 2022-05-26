import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import UiButton from "../ui/UiButton";
import axios from "axios";
import { downloadSong } from "../../src/reproducirCanciones";

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

function ListedSong({song, onPress}) {


  return <UiButton title={song.title} onPress={async () => {
    const songSound = await downloadSong(song.url)
    onPress({ sound: songSound, data: song })
  }
  }></UiButton>
}

function AllSongs({setSong}) {
  const [songs, setSongs] = useState(null)

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
      {songs.map((song) => <ListedSong key={song.title + song.artistId + song.url} song={song} onPress={(song) => setSong(song)}/>)}
    </View>;
  } else {
    return <View><Text>WAITING</Text></View>
  }
}

function Home({ setSong }) {

  return <View style={{
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    width: "100%",
    height: "70%",
  }}>
    <AllSongs setSong={setSong}/>
  </View>;
}

const styles = StyleSheet.create({});

export default Home;
