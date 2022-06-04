import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import { AllSongs } from "./AllSongs";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getSongsWith } from "../../src/fetchSongs";
import axios from "axios";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


// pressableStyle={styles.profiles}
// textStyle={styles.profilesText}

function ListedProfile({profile, onPress}) {
  return (
    <UiButton
      pressableStyle={styles.profiles}
      title={profile.email}
      onPress={() => {
        onPress(profile.uid)
      }}
    />
  );

}

function AllProfiles({ profiles, setCurrentScreen, setOtheruid }) {
  if (profiles) {
    return (
      <View style={styles.view}>
        {profiles.map((profile) => (
          <ListedProfile
            key={profile.uid}
            profile={profile}
            onPress={(uid) => {
              console.log(uid)
              setOtheruid(uid)
              setCurrentScreen("OTHER PROFILE")
            }}
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

async function getProfilesWith(searchBy) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/user?name=${searchBy}`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export function Search({ setCurrentScreen, setSong, setOtheruid }) {
  const [songs, setSongs] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [searchBy, setSearchBy] = useState(undefined);
  const [startSearch, setStartSearch] = useState(false);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongsWith(searchBy);
      const fetchedProfiles = await getProfilesWith(searchBy);
      setProfiles(fetchedProfiles.data.users);
      setSongs(fetchedSongs.data);
    }

    if (startSearch) {
      console.log(searchBy);
      aux().then();
      setStartSearch(false);
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
        <UiButton
          pressableStyle={styles.button}
          title={<Text>Search</Text>}
          onPress={() => setStartSearch(true)}
        ></UiButton>
      </View>
      <AllSongs setSong={setSong} songs={songs} />
      <AllProfiles profiles={profiles} setCurrentScreen={setCurrentScreen} setOtheruid={setOtheruid}/>
    </View>
  );
}

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
  profiles: {
    backgroundColor: "#006E95",
    marginTop: 20,
  },
  textInput: {
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#006E95",
  },
});
