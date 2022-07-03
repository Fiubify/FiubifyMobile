import { StyleSheet, Text, View } from "react-native";
import Info from "../profile/Info";
import { AllSongs } from "../Song/AllSongs";
import React, { useEffect, useState } from "react";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import UiButton from "../ui/UiButton";
import { downloadSong } from "../../src/reproducirCanciones";
import { postSongEvent } from "../../src/fetchMetrics";
import { getAlbumById } from "../../src/fetchContent";
import { BASE_URL, listenedAction } from "../../constantes";
import { navigateToEditPlaylist } from "../../src/navigates";

export function PlaylistView({
  data,
  setSong,
  setData,
  setCurrentScreen,
  currentUserUId,
  navigation,
  token,
}) {
  const { playlist } = data;
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  if (playlist === undefined) {
    alert("No se designo la playlist");
    return <Text>NO HAY PLAYLIST</Text>;
  }

  useEffect(() => {
    axios
      .get(`${BASE_URL}/contents/playlists/${playlist._id}`)
      .then(({ data }) => {
        setTracks(data.data.tracks);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Loading..</Text>;
  } else {
    return (
      <View style={styles.view}>
        <View style={styles.viewBody}>
          <Text style={styles.title_text}>{playlist.title}</Text>
          <View style={styles.title}>
            <UiButton
              title="Add Song"
              pressableStyle={styles.loadSong}
              onPress={() => {
                setData({ playlist: playlist });
                setCurrentScreen("ADD-SONG-PLAYLIST");
              }}
            />
            <UiButton
              title="Edit Playlist"
              pressableStyle={styles.loadSong}
              onPress={() => {
                navigateToEditPlaylist(
                  currentUserUId,
                  token,
                  playlist,
                  navigation
                );
              }}
            />
          </View>
          <Info
            title="Owners"
            contain={playlist.owners.map((owner) => owner.name).join(",")}
            icon="microphone-variant"
          />
          <Info
            title="Description"
            contain={playlist.description}
            icon="card-text-outline"
          />
          <Info
            title="Collaborative"
            contain={playlist.collaborative ? "Active" : "Non Active"}
            icon="human-male-female"
          />
          <Info
            containerStyles={styles.tracks}
            title="Tracks"
            contain=""
            icon="playlist-music"
          />
          <AllSongs
            currentUserUId={currentUserUId}
            token={token}
            songs={tracks}
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
            navigation={navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
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
    justifyContent: "space-between",
    marginBottom: "2%",
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
  loadSong: {
    width: wp(40),
    marginTop: hp(2),
    backgroundColor: "#006E95",
    paddingHorizontal: 0,
  },
  tracks: {
    borderBottomWidth: 0,
  },
});
