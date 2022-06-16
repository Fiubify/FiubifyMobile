import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";

function ListedSong({ song, onPress }) {
  return (
    <UiButton
      pressableStyle={styles.songs}
      textStyle={styles.songsText}
      title={song.title}
      onPress={() => onPress(song)}
    ></UiButton>
  );
}

export function AllSongs({ setSong, songs }) {
  if (songs) {
    if (songs.length > 0) {
      return (
        <View style={styles.view}>
          {songs.map((song) => (
            <ListedSong
              key={song.title + song.artistId + song.url}
              song={song}
              onPress={setSong}
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
