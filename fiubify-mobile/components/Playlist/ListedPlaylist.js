import UiButton from "../ui/UiButton";
import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export function ListedPlaylist({ playlist, onPress }) {
  return (
    <View style={styles.playlistContainer}>
      <MaterialCommunityIcons
        style={styles.playlistIcon}
        name="playlist-music-outline"
        size={20}
        color="white"
      />
      <UiButton
        pressableStyle={styles.playlists}
        textStyle={styles.playlistsText}
        title={playlist.title}
        onPress={() => {
          onPress(playlist);
        }}
      ></UiButton>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
  playlistContainer: {
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
  playlistIcon: {
    backgroundColor: "#006E95",
    borderRadius: 25,
    padding: "3%",
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
  },
  playlists: {
    width: "85%",
    backgroundColor: "white",
    elevation: 0,
  },
  playlistsText: {
    color: "#006E95",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
});
