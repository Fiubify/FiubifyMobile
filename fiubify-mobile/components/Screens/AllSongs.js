import UiButton from "../ui/UiButton";
import { downloadSong } from "../../src/reproducirCanciones";
import { StyleSheet, Text, View } from "react-native";
import { postSongEvent } from "../../src/fetchMetrics";
import { listenedAction } from "../../constantes";
import { getAlbumById } from "../../src/fetchContent";

function ListedSong({ song, onPress, userUId }) {
  return (
    <UiButton
      pressableStyle={styles.songs}
      textStyle={styles.songsText}
      title={song.title}
      onPress={async () => {
        const songSound = await downloadSong(song.url);
        const album = await getAlbumById(song.albumId);
        await postSongEvent(listenedAction, song.genre, song.tier, userUId, song.title , album.data.title);
        onPress({ sound: songSound, data: song });
      }}
    ></UiButton>
  );
}

export function AllSongs({ setSong, songs, currentUserUId }) {
  if (songs) {
    if (songs.length > 0) {
      return (
        <View style={styles.view}>
          {songs.map((song) => (
            <ListedSong
              key={song.title + song.artistId + song.url}
              song={song}
              onPress={setSong}
              userUId={currentUserUId}
            />
          ))}
        </View>
      );
    } else {
      return (
        <Text>No Content available</Text>
      );
    }
  } else {
    return null;
  }
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  songs: {
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    marginTop: 20,
  },
  songsText: {
    color: "#006E95",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
});
