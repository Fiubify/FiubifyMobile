import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { AllSongs} from "./AllSongs";
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

      {songs.map((song) => <UiButton key={song.title + song.artistId + song.url} title={song.title}></UiButton>)}

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
