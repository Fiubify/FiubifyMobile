import { StyleSheet, Text, View } from "react-native";
import Info from "../profile/Info";
import { AllSongs } from "../Screens/AllSongs";
import React, { useEffect, useState } from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import axios from "axios";
import UiButton from "../ui/UiButton";
import { downloadSong } from "../../src/reproducirCanciones";
import { postSongEvent } from "../../src/fetchMetrics";
import { getAlbumById } from "../../src/fetchContent";
import { listenedAction } from "../../constantes";

export function PlaylistView({ data, setSong, setData, setCurrentScreen, currentUserUId, navigation, token }) {
  const { playlist } = data;
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  if (playlist === undefined) {
    alert("No se designo la playlist");
    return <Text>NO HAY PLAYLIST</Text>;
  }

  useEffect(() => {
    axios.get(`https://fiubify-middleware-staging.herokuapp.com/contents/playlists/${playlist._id}`).then(({ data }) => {
      setTracks(data.data.tracks);
      setLoading(false)
    });
  }, []);

  if (loading) {
    return <Text>LOADING...</Text>;
  } else {
    return (
      <View style={styles.view}>
        <View style={styles.viewBody}>
          <View style={styles.title}>
            <Text style={styles.title_text}>
              {playlist.title}
            </Text>
            <UiButton
              title="+"
              pressableStyle={styles.loadSong}
              textStyle={styles.textStyle}
              onPress={() => {
                setData({ playlist: playlist });
                setCurrentScreen("ADD-SONG-PLAYLIST")
              }}
            />
            <UiButton
              title="*"
              pressableStyle={styles.loadSong}
              textStyle={styles.textStyle}
              onPress={() => {
                navigation.navigate("PlaylistEdit", {
                  uid: currentUserUId,
                  token,
                  playlist
                })
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
            title=""
            contain={playlist.collaborative ? "Collaborative" : "Non collaborative"}
            icon="human-male-female"
          />
          <Info
            title="Tracks"
            contain=""
            icon="playlist-music"
          />
          <AllSongs songs={tracks} setSong={async (song) => {
            const songSound = await downloadSong(song.url);
            setSong({ sound: songSound, data: song });
            const album = await getAlbumById(song.albumId);
            await postSongEvent(listenedAction, song.genre, song.tier, currentUserUId, song.title , album.data.title);
          }} />
        </View>
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
  loadSong: {
    width: wp(15),
    marginTop: hp(2),
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    paddingHorizontal: 0,
    marginLeft: "10%"
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
});
