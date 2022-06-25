import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";
import { postSongEvent } from "../../src/fetchMetrics";
import { listenedAction } from "../../constantes";
import { getAlbumById } from "../../src/fetchContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function ListedSong({ song, onPress, userUId }) {
  return (
    <View style={styles.musicContainer}>
      <MaterialCommunityIcons
        style={styles.musicIcon}
        name="music"
        size={20}
        color="white"
      />
      <UiButton
        pressableStyle={styles.songs}
        textStyle={styles.songsText}
        title={song.title}
        onPress={() => onPress(song)}
      ></UiButton>
    </View>
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
      return <Text style={styles.loading}>No Content available</Text>;
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
  musicContainer: {
    width: "90%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    borderRadius: 25,
  },
  musicIcon: {
    backgroundColor: "#006E95",
    borderRadius: 25,
    padding: "3%",
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
  },
  songs: {
    width: "85%",
    backgroundColor: "white",
    elevation: 0,
  },
  songsText: {
    color: "#006E95",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
});
