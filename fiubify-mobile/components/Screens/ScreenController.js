import React, { useEffect, useState } from "react";
import Home from "./Home";
import Profile from "../profile/Profile";
import Header from "./Header";
import Footer from "./Footer";
import SongForm from "./SongForm";
import { ScrollView, StyleSheet, View } from "react-native";
import { Search } from "./Search";

function stopAndSetSong(song, setSong) {
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

function ScreenController({ route }) {
  const [song, setSong] = useState();
  const { uid } = route.params;
  const [currentScreen, setCurrentScreen] = useState("HOME");
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (currentScreen === "HOME") {
      setComponent(<Home setCurrentScreen={setCurrentScreen} setSong={stopAndSetSong(song, setSong)} />);
    } else if (currentScreen === "SEARCH") {
      setComponent(<Search setCurrentScreen={setCurrentScreen} setSong={stopAndSetSong(song, setSong)} />);
    } else if (currentScreen === "LOAD-SONG") {
      setComponent(
        <SongForm userUId={uid} setCurrentScreen={setCurrentScreen} />,
      );
    } else {
      setComponent(null);
    }
  }, [currentScreen, song]);

  if (currentScreen === "PROFILE") {
    return <Profile userUId={uid} setCurrentScreen={setCurrentScreen} />;
  } else
    return (
      <View style={styles.view}>
        <Header setCurrentScreen={setCurrentScreen} song={song} />
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

export default ScreenController;
