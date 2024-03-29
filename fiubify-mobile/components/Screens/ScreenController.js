import React, { useEffect, useState } from "react";
import Home from "./Home";
import Header from "./Section/Header";
import Footer from "./Section/Footer/Footer";
import SongForm from "../Song/SongForm";
import { ScrollView, StyleSheet, View } from "react-native";
import { Search } from "./Search/Search";
import { MyLibrary } from "./MyLibrary";
import { AlbumView } from "../Album/AlbumView";
import { PlaylistView } from "../Playlist/PlaylistView";
import { AddSongPlaylist } from "../Song/AddSongPlaylist";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";
import * as Notifications from "expo-notifications";

export function stopAndSetSong(song, setSong) {
  return (newSong) => {
    if (song) {
      song.sound.pauseAsync().then(() => {
        song.sound.unloadAsync().then(() => {
          setSong(newSong);
        });
      });
    } else {
      setSong(newSong);
    }
  };
}

async function writeUserData(
  userUid,
) {
  const sendListRef = ref(database, "/users/token/" + userUid);
  set(sendListRef, {
    token: await Notifications.getExpoPushTokenAsync(),
  });
}

export default function ScreenController({ navigation, route }) {
  const [song, setSong] = useState();
  const { uid, token } = route.params;
  const [currentScreen, setCurrentScreen] = useState("HOME");
  const [component, setComponent] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    writeUserData(uid).then(_ => null);
  }, []);

  useEffect(() => {
    switch (currentScreen) {
      case "HOME":
        setComponent(
          <Home
            setSong={stopAndSetSong(song, setSong)}
            currentUserUId={uid}
            token={token}
            navigation={navigation}
          />
        );
        break;
      case "SEARCH":
        setComponent(
          <Search
            token={token}
            currentUserId={uid}
            navigation={navigation}
            setSong={stopAndSetSong(song, setSong)}
            setData={setData}
            setCurrentScreen={setCurrentScreen}
          />
        );
        break;
      case "LOAD_SONG":
        setComponent(
          <SongForm
            userUId={uid}
            token={token}
            setCurrentScreen={setCurrentScreen}
          />
        );
        break;
      case "ALBUM-VIEW":
        setComponent(
          <AlbumView
            data={data}
            setSong={stopAndSetSong(song, setSong)}
            currentUserUId={uid}
            token={token}
            navigation={navigation}
          />
        );
        break;
      case "PLAYLIST-VIEW":
        setComponent(
          <PlaylistView
            data={data}
            setSong={stopAndSetSong(song, setSong)}
            setData={setData}
            token={token}
            navigation={navigation}
            setCurrentScreen={setCurrentScreen}
            currentUserUId={uid}
          />
        );
        break;
      case "MY-LIBRARY":
        setComponent(
          <MyLibrary
            token={token}
            currentUserId={uid}
            navigation={navigation}
            setData={setData}
            setCurrentScreen={setCurrentScreen}
          />
        );
        break;
      case "ADD-SONG-PLAYLIST":
        setComponent(
          <AddSongPlaylist
            token={token}
            currentUserId={uid}
            data={data}
            setData={setData}
            setCurrentScreen={setCurrentScreen}
            navigation={navigation}
          />
        );
        break;
      default:
        alert("SCREEN NOT FOUND");
        setComponent(null);
    }
  }, [currentScreen, song]);

  return (
    <View style={styles.view}>
      <Header song={song} token={token} navigation={navigation} userUId={uid} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        {component}
      </ScrollView>
      <Footer
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  scroll: {
    width: "100%",
    display: "flex",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
