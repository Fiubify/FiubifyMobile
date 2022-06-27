import { StyleSheet, Text, View } from "react-native";
import Info from "../profile/Info";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getUser } from "../../src/GetUser";
import { useEffect, useState } from "react";
import { AllSongs } from "../Screens/AllSongs";
import React from "react";
import { downloadSong } from "../../src/reproducirCanciones";
import { postSongEvent } from "../../src/fetchMetrics";
import { listenedAction } from "../../constantes";
import { getAlbumById } from "../../src/fetchContent";

export function AlbumView({ data: { album }, setSong, currentUserUId }) {
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    getUser(album.artistId).then((user) => {
      setArtist(user);
      setLoading(false);
    });
  }, []);

  if (!loading) {
    return (
      <View style={styles.view}>
        <View style={styles.viewBody}>
          <View style={styles.title}>
            <Text style={styles.title_text}>{album.title}</Text>
          </View>
          <Info
            title="Artist"
            contain={artist.name + " " + artist.surname}
            icon="microphone-variant"
          />
          <Info
            title="Plan"
            contain={album.tier}
            icon={album.tier === "Free" ? "cash-remove" : "diamond-stone"}
          />
          <Info
            title="Genre"
            contain={album.genre}
            icon="music-circle-outline"
          />
          <Info
            containerStyles={styles.tracks}
            title="Tracks"
            contain=""
            icon="playlist-music"
          />
          <AllSongs
            songs={album.tracks}
            currentUserUId={currentUserUId}
            setSong={async (song) => {
              const songSound = await downloadSong(song.url);
              setSong({ sound: songSound, data: song });
              const album = await getAlbumById(song.albumId);
              await postSongEvent(
                listenedAction,
                song.genre,
                song.tier,
                currentUserUId,
                song._id,
                song.title,
                song.albumId,
                album.data.title
              );
            }}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.viewBody}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "space-between",
  },
  viewBody: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    marginTop: "5%",
  },
  link: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginBottom: hp(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
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
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
  tracks: {
    borderBottomWidth: 0,
  },
});
