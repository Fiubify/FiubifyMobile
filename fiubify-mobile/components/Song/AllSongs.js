import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";
import {
  addFavouriteSong,
  deleteFavouriteSong,
  getFavouriteSongs,
} from "../../src/fetchContent";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState } from "react";
import { navigateToSongMessagesView } from "../../src/navigates";

function ListedSong({ song, onPress, userUId, favSongs, token, navigation }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (
      favSongs.map((song) => song._id.toString()).includes(song._id.toString())
    ) {
      setIsFav(true);
    }
  }, [favSongs]);

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
      <MaterialCommunityIcons
        name={isFav ? "cards-heart" : "heart-outline"}
        size={30}
        color="#006E95"
        onPress={() => {
          if (isFav) {
            deleteFavouriteSong(userUId, song._id, token).then();
          } else {
            addFavouriteSong(userUId, song._id, token).then();
          }
          setIsFav(!isFav);
        }}
      />
      <MaterialIcons
        name="message"
        color="#006E95"
        size={30}
        onPress={() => {
          navigateToSongMessagesView(userUId, token, song, navigation);
        }}
      />
    </View>
  );
}

export function AllSongs({
  token,
  setSong,
  songs,
  currentUserUId,
  navigation,
}) {
  const [favSongs, setFavSongs] = useState([]);

  useEffect(() => {
    getFavouriteSongs(currentUserUId, token).then((tracks) =>
      setFavSongs(tracks)
    );
  }, []);

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
              favSongs={favSongs}
              token={token}
              navigation={navigation}
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
    elevation: 10,
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
    width: "65%",
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
