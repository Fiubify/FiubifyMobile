import React, { useEffect, useState } from "react";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import SongForm from "./SongForm";
import { ScrollView, StyleSheet, View } from "react-native";
import { Search } from "./Search";
import { AlbumView } from "../Album/AlbumView";

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

export default function ScreenController({ navigation, route }) {
  const [song, setSong] = useState();
  const { uid, token } = route.params;
  const [currentScreen, setCurrentScreen] = useState("HOME");
  const [component, setComponent] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    if (currentScreen === "HOME") {
      setComponent(
        <Home
          setCurrentScreen={setCurrentScreen}
          setSong={stopAndSetSong(song, setSong)}
          currentUserUId={uid}
        />,
      );
    } else if (currentScreen === "SEARCH") {
      setComponent(<Search token={token} currentUserId={uid} navigation={navigation}
                           setSong={stopAndSetSong(song, setSong)} setData={setData} setCurrentScreen={setCurrentScreen}/>);
    } else if (currentScreen === "LOAD-SONG") {
      setComponent(
        <SongForm userUId={uid} token={token} setCurrentScreen={setCurrentScreen} />,
      );
    } else if (currentScreen === "ALBUM-VIEW") {
      setComponent(
        <AlbumView data={data} setSong={stopAndSetSong(song, setSong)} currentUserUId={uid}/>,
      );
    } else {
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
