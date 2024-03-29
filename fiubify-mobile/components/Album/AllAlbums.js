import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToAlbumMessagesView } from "../../src/navigates";

function ListedAlbum({ album, onPress, userUId, token, navigation }) {
  return (
    <View style={styles.albumContainer}>
      <MaterialCommunityIcons
        style={styles.albumIcon}
        name="album"
        size={20}
        color="white"
      />
      <UiButton
        pressableStyle={styles.albums}
        textStyle={styles.albumsText}
        title={album.title}
        onPress={() => {
          onPress(album);
        }}
      />
      <MaterialIcons
        name="message"
        color="#006E95"
        size={30}
        onPress={() => {
          navigateToAlbumMessagesView(userUId, token, album, navigation);
        }}
      />
    </View>
  );
}

export function AllAlbums({ userUId, token, navigation, albums, setAlbum }) {
  if (albums) {
    if (albums.length > 0) {
      return (
        <View style={styles.view}>
          {albums.map((album) => (
            <ListedAlbum
              key={album._id}
              album={album}
              onPress={(album) => {
                setAlbum(album);
              }}
              userUId={userUId}
              token={token}
              navigation={navigation}
            />
          ))}
        </View>
      );
    } else {
      return <Text style={styles.loading}>No Content available</Text>;
    }
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    margin: 10,
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  albumContainer: {
    width: "90%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    borderRadius: 25,
    elevation: 10,
  },
  albumIcon: {
    backgroundColor: "#006E95",
    borderRadius: 25,
    padding: "3%",
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
  },
  albums: {
    width: "75%",
    backgroundColor: "white",
    elevation: 0,
  },
  albumsText: {
    color: "#006E95",
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
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
});
