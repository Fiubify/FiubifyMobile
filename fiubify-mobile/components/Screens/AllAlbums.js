import UiButton from "../ui/UiButton";
import { StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function ListedAlbum({ album, onPress }) {
  return (
    <UiButton
      pressableStyle={styles.button}
      title={album.title}
      onPress={() => {
        onPress(album._id);
      }}
    />
  );
}

export function AllAlbums({ albums,
                            navigation,
                            currentUserId, }) {
  if (albums.length > 0) {
    return (
      <View style={styles.view}>
        {albums.map((album) => (
          <ListedAlbum
            key={album._id}
            album={album}
            onPress={(_id) => {
              // navigation.navigate("ExternProfile", {
              //   userUId: _id,
              //   currentUserUId: currentUserId,
              // });//"Album"
              console.log("album id: ", _id);
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
    margin: 10
  },
});