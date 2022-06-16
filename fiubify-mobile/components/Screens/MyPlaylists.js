import { StyleSheet, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ListedPlaylist } from "./ListedPlaylist";
import { useEffect, useState } from "react";
import axios from "axios";

export function MyPlaylists({ currentUserId, onSelect }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`https://fiubify-middleware-staging.herokuapp.com/contents/playlists?owners.id=${currentUserId}`).then((data) => {
        setPlaylists(data.data.data);
        setLoading(false)
      },
    );
  }, []);

  if (loading)
    return <Text>LOADING...</Text>;
  else
    return <View style={styles.view}>
      {playlists.map((playlist) => (
        <ListedPlaylist
          key={playlist._id}
          playlist={playlist}
          onPress={onSelect}
        />
      ))}
    </View>;
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
    // display: "flex",
    // flexDirection: "row",
  },
});
