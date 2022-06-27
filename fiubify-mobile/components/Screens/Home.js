import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AllSongs} from "./AllSongs";
import { useEffect, useState } from "react";
import { getAlbumById, getFavouriteSongs } from "../../src/fetchContent";
import { downloadSong } from "../../src/reproducirCanciones";
import { postSongEvent } from "../../src/fetchMetrics";
import { listenedAction } from "../../constantes";

function Home({ setSong, currentUserUId, token }) {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getFavouriteSongs(currentUserUId, token);
      setSongs(fetchedSongs);
    }
    aux().then();
  }, [songs]);
  return (
    <View style={styles.view}>
      <View style={styles.title}>
        <Text style={styles.title_text}>
          My Favourites
        </Text>
      </View>
      <AllSongs token={token} currentUserUId={currentUserUId} setSong={async (song) => {
        const songSound = await downloadSong(song.url);
        setSong({ sound: songSound, data: song });
        const album = await getAlbumById(song.albumId);
        await postSongEvent(listenedAction, song.genre, song.tier, currentUserUId, song.title , album.data.title);
      }} songs={songs}/>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  title: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title_text: {
    fontSize: 30,
    color: "#006E95",
    fontWeight: "bold",
    textAlign: "justify",
  },
});

export default Home;
