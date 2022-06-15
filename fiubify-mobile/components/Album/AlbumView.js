import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Info from "../profile/Info";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { getUser } from "../../src/GetUser";
import { useEffect, useState } from "react";

export function AlbumView({ navigation, route }) {
  const { album, currentUserUId } = route.params;
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    getUser(album.artistId).then((user) => {
      setArtist(user);
      setLoading(false);
    });
  }, []);

  if (!loading){
    return (
      <View style={styles.view}>
        <Text
          style={styles.link}
          onPress={() =>
            navigation.navigate("Home", {
              uid: currentUserUId,
            })
          }
        >
          <MaterialIcons name="arrow-back-ios" />
          Back
        </Text>
        <View style={styles.title}>
          <Text style={styles.title_text}>
            {album.title}
          </Text>
        </View>
        <Info
          title="Artist"
          contain={artist.name + " " + artist.surname}
          icon="microphone-variant"
        />
        <Info
          title="Plan"
          contain={album.tier}
          icon={album.tier === "Free" ? "cash-remove" : "diamond-stone"}
        />
        <Info
          title="Genre"
          contain={album.genre}
          icon="music-circle-outline"
        />
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
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginBottom: hp(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  perfilImage: {
    width: wp(50),
    resizeMode: "contain",
  },
  title: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title_text: {
    fontSize: 30,
    color: "#006E95",
    fontWeight: "bold",
    textAlign: "justify",
  },
  description: {
    width: "90%",
    color: "#006E95",
  },
  artist: {
    width: wp(90),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  artistCreate: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
  buttonListener: {
    width: wp(90),
    marginTop: hp(2),
    backgroundColor: "#006E95",
    borderColor: "#006E95",
    borderWidth: 2,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
});