import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function ListedAlbum({ album, onPress }) {
  return (
    <UiButton
      pressableStyle={styles.button}
      title={album.title}
      onPress={() => {
        onPress(album);
      }}
    />
  );
}

export function AllAlbums({
                            albums,
                            setAlbum,
                          }) {
  if (albums) {
    if (albums.length > 0) {
      return (
        <View style={styles.view}>
          {albums.map((album) => (
            <ListedAlbum
              key={album._id}
              album={album}
              onPress={(album) => {
                setAlbum(album)
              }}
            />
          ))}
        </View>
      );
    } else {
      return (
        <Text>No Content available</Text>
      );
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
    margin: 10,
  },
});