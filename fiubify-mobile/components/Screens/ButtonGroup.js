import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getSongsWithGenre, getSongsWithTitle } from "../../src/fetchSongs";
import { getProfilesWith } from "../../src/fetchProfiles";

export default function ButtonGroup({setSearchFunction, setStartSearch, setContentFunction, setSongs, setProfiles}) {

  const [selection, setSelection] = useState(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity style={[styles.btn, selection === 1 ? { backgroundColor: "#6B7280" } : null]} onPress={() => {
          setSelection(1);
          setSearchFunction(() => getSongsWithTitle);
          setContentFunction(() => setSongs);
          setStartSearch(true);
        }}>
          <Text style={[styles.btnText, selection === 1 ? { color: "white" } : { color: "black" }]}>Songs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, selection === 2 ? { backgroundColor: "#6B7280" } : null]} onPress={() => {
          setSelection(2);
          setSearchFunction(() => getSongsWithGenre);
          setContentFunction(() => setSongs);
          setStartSearch(true);
        }}>
          <Text style={[styles.btnText, selection === 2 ? { color: "white" } : { color: "black" }]}>Genres</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, selection === 3 ? { backgroundColor: "#6B7280" } : null]} onPress={() => {
          setSelection(3);
          setSearchFunction(() => getProfilesWith);
          setContentFunction(() => setProfiles);
          setStartSearch(true);
        }}>
          <Text style={[styles.btnText, selection === 3 ? { color: "white" } : { color: "black" }]}>Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, selection === 4 ? { backgroundColor: "#6B7280" } : null]} onPress={() => setSelection(4)}>
          <Text style={[styles.btnText, selection === 4 ? { color: "white" } : { color: "black" }]}>Button 4</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#6B7280'
  },
  btn: {
    flex: 1,
    borderRightWidth: 0.25,
    borderLeftWidth: 0.25,
    borderColor: '#6B7280'
  },
  btnText: {
    textAlign: 'center',
    paddingVertical: 16,
    fontSize: 14
  }
});
