import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getSongsWithTitle } from "../../src/fetchSongs";
import { AllProfiles } from "./AllProfiles";
import CheckBox from "expo-checkbox";
import ButtonGroup from "./ButtonGroup";

//TODO: manejar el label del "Loading..." (que desaparezca cuando no se encontro contenido,
// mostrar un "Oops, try something else")

export function Search({
                         navigation,
                         setSong,
                         currentUserId,
                         setOtheruid,
                         token,
                       }) {

  const [songs, setSongs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [searchBy, setSearchBy] = useState(undefined);
  const [tierFilter, setTierFilter] = useState(null);
  const [searchFunction, setSearchFunction] = useState(() => getSongsWithTitle);
  const [contentFunction, setContentFunction] = useState(() => setSongs);
  const [startSearch, setStartSearch] = useState(false);

  const [checkboxSelected, setCheckboxSelected] = useState(false);

  useEffect(() => {
    async function aux() {
      // const fetchedSongs = [];
      // const fetchedSongsByTitle = await getSongsWithTitle(searchBy, tierFilter);
      // const fetchedSongsByGenre = await getSongsWithGenre(searchBy, tierFilter);
      // const fetchedProfiles = await getProfilesWith(searchBy);
      // fetchedSongs.push.apply(fetchedSongs, fetchedSongsByTitle.data);
      // fetchedSongs.push.apply(fetchedSongs, fetchedSongsByGenre.data);
      // setSongs(fetchedSongs);
      // setProfiles(fetchedProfiles.data);
      console.log("antes de usar la funcion")
      const fetchedContent = await searchFunction(searchBy, tierFilter);
      console.log("desps de usar la funcion")
      //setSongs(fetchedContent.data);
      contentFunction(fetchedContent.data)
    }

    if (startSearch) {
      setSongs([]);
      setProfiles([]);
      aux().then(() => {
        setStartSearch(false);
      });
    }
  }, [startSearch]);

  return (
    <View style={styles.view}>
      <View style={styles.searchBar}>
        <UiTextInput
          style={styles.textInput}
          placeholder="Search by artist, song, etc"
          onChange={(text) => setSearchBy(text)}
        ></UiTextInput>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={checkboxSelected}
            onValueChange={(newValue) => {
              setCheckboxSelected(newValue);
              if (newValue) {
                setTierFilter("Free");
              } else {
                setTierFilter(null);
              }
            }}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Free content only</Text>
        </View>

        <UiButton
          pressableStyle={styles.button}
          title={<Text>Search</Text>}
          onPress={() => setStartSearch(true)}
        ></UiButton>
      </View>
      <View style={styles.filterButtons}>
        <ButtonGroup
          setStartSearch={setStartSearch}
          setSearchFunction={setSearchFunction}
          setContentFunction={setContentFunction}
          setSongs={setSongs}
          setProfiles={setProfiles}/>
      </View>
      <AllSongs setSong={setSong} songs={songs} />
      <AllProfiles
        profiles={profiles}
        currentUserId={currentUserId}
        navigation={navigation}
        setOtheruid={setOtheruid}
        token={token}
      />
    </View>
  );
}

Array.prototype.extend = function(other_array) {
  /* You should include a test to check whether other_array really is an array */
  other_array.forEach(function(v) {
    this.push(v);
  }, this);
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBar: {
    width: "100%",
    marginTop: hp(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#006E95",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  filterButtons: {
    width: "100%",
    height: hp(15),
    display: "flex",
    flexDirection: "row",
  },
});
