import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import UiButton from "../ui/UiButton";
import axios from "axios";
import { downloadSong } from "../../src/reproducirCanciones";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

async function getSongs() {
  try {
    let response = await axios.get(`https://fiubify-middleware-staging.herokuapp.com/contents/songs`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

function ListedSong({ song, onPress }) {


  return <UiButton title={song.title} onPress={async () => {
    const songSound = await downloadSong(song.url);
    onPress({ sound: songSound, data: song });
  }} pressableStyle={styles.songs} textStyle={styles.songsText}></UiButton>;
}

function AllSongs({ setSong }) {
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
    return (
      <View style={styles.view}>
        {songs.map((song) => (
          <ListedSong
            key={song.title + song.artistId + song.url}
            song={song}
            onPress={(song) => setSong(song)}
          />
        ))}
      </View>
    );
  } else {
    return (<View style={styles.view}>
      <Text>WAITING</Text>
    </View>);
  }
}

function Home({ setSong, setCurrentScreen }) {
  return (<View style={styles.view}>
    <AllSongs setSong={setSong} />
  </View>);
}

const styles = StyleSheet.create({
  view: {
    width: "100%", height: hp(100), justifyContent: "flex-start", alignItems: "center", display: "flex",
  }, songs: {
    backgroundColor: "white", borderColor: "#006E95", borderWidth: 2, marginTop: 20,
  }, songsText: {
    color: "#006E95",
  },
});

export default Home;
