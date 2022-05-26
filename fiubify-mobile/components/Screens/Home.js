
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getSongs } from "../../src/fetchSongs";

function Home({ setSong }) {
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
      {songs.map((song) => <ListedSong key={song.title + song.artistId + song.url} song={song} onPress={(song) => setSong(song)}/>)}
    </View>;
  } else {
    return <View><Text>WAITING</Text></View>
  }
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
});

export default Home;
