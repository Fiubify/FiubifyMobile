import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AllSongs} from "./AllSongs";
import { useEffect, useState } from "react";
import { getAlbumById, getSongs } from "../../src/fetchContent";
import { downloadSong } from "../../src/reproducirCanciones";
import { postSongEvent } from "../../src/fetchMetrics";
import { listenedAction } from "../../constantes";

function Home({ setSong, currentUserUId, token }) {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongs();
      setSongs(fetchedSongs.data);
    }

    aux().then();
  }, []);
  return (
    <View style={styles.view}>
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
});

export default Home;
