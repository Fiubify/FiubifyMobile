import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { MyPlaylists } from "./MyPlaylists";

export function MyLibrary({
                            navigation,
                            currentUserId,
                            token,
                            setCurrentScreen,
                            setData,
                          }) {
  return <View style={styles.view}>
    <MyPlaylists token={token} navigation={navigation} currentUserId={currentUserId} onSelect={(playlist) => {
      setData({playlist})
      setCurrentScreen("PLAYLIST-VIEW");
    }} />
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
