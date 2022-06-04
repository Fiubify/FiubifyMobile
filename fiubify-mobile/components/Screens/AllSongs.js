import UiButton from "../ui/UiButton";
import { downloadSong } from "../../src/reproducirCanciones";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function ListedSong({ song, onPress }) {
  return (
    <UiButton
      pressableStyle={styles.songs}
      textStyle={styles.songsText}
      title={song.title}
      onPress={async () => {
        const songSound = await downloadSong(song.url);
        onPress({ sound: songSound, data: song });
      }}
    ></UiButton>
  );
}

export function AllSongs({ setSong, songs }) {
  if (songs) {
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
      <View style={styles.view}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
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
