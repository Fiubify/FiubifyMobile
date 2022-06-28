import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  getAlbumsWithTitle,
  getContentByGenre,
  getSongsWithTitle,
} from "../../../src/fetchContent";
import { getArtistsWith, getProfilesWith } from "../../../src/fetchProfiles";

export default function ButtonGroup({
  setSearchFunction,
  setStartSearch,
  setContentFunction,
  setSongs,
  setProfiles,
  setAlbums,
  setGenre,
}) {
  const [selection, setSelection] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[
            styles.btn,
            selection === 1 ? { backgroundColor: "#006E95" } : null,
          ]}
          onPress={() => {
            setSelection(1);
            setSearchFunction(() => getSongsWithTitle);
            setContentFunction(() => setSongs);
            setStartSearch(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              selection === 1 ? { color: "white" } : { color: "black" },
            ]}
          >
            Songs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            selection === 2 ? { backgroundColor: "#006E95" } : null,
          ]}
          onPress={() => {
            setSelection(2);
            setSearchFunction(() => getAlbumsWithTitle);
            setContentFunction(() => setAlbums);
            setStartSearch(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              selection === 2 ? { color: "white" } : { color: "black" },
            ]}
          >
            Albums
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            selection === 3 ? { backgroundColor: "#006E95" } : null,
          ]}
          onPress={() => {
            setSelection(3);
            setSearchFunction(() => getArtistsWith);
            setContentFunction(() => setProfiles);
            setStartSearch(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              selection === 3 ? { color: "white" } : { color: "black" },
            ]}
          >
            Artists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            selection === 4 ? { backgroundColor: "#006E95" } : null,
          ]}
          onPress={() => {
            setSelection(4);
            setSearchFunction(() => getContentByGenre);
            setContentFunction(() => setGenre);
            setStartSearch(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              selection === 4 ? { color: "white" } : { color: "black" },
            ]}
          >
            Genres
          </Text>
        </TouchableOpacity>
        {/*<TouchableOpacity*/}
        {/*  style={[*/}
        {/*    styles.btn,*/}
        {/*    selection === 5 ? { backgroundColor: "#006E95" } : null,*/}
        {/*  ]}*/}
        {/*  onPress={() => {*/}
        {/*    setSelection(5);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Text*/}
        {/*    style={[*/}
        {/*      styles.btnText,*/}
        {/*      selection === 5 ? { color: "white" } : { color: "black" },*/}
        {/*    ]}*/}
        {/*  >*/}
        {/*    Playlists*/}
        {/*  </Text>*/}
        {/*</TouchableOpacity>*/}
        <TouchableOpacity
          style={[
            styles.btn,
            selection === 6 ? { backgroundColor: "#006E95" } : null,
          ]}
          onPress={() => {
            setSelection(6);
            setSearchFunction(() => getProfilesWith);
            setContentFunction(() => setProfiles);
            setStartSearch(true);
          }}
        >
          <Text
            style={[
              styles.btnText,
              selection === 6 ? { color: "white" } : { color: "black" },
            ]}
          >
            Profiles
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  btnGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    flex: 1,
    marginHorizontal: "1%",
    borderWidth: 1,
    borderColor: "#006E95",
    borderRadius: 25,
  },
  btnText: {
    textAlign: "center",
    paddingVertical: 7,
    fontSize: 14,
  },
});
