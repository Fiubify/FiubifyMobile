import UiButton from "../ui/UiButton";
import { StyleSheet } from "react-native";

export function ListedPlaylist({ playlist, onPress }) {
  return <UiButton
    pressableStyle={styles.songs}
    textStyle={styles.songsText}
    title={playlist.title}
    onPress={() => {
      onPress(playlist)
    }}
  ></UiButton>;
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
