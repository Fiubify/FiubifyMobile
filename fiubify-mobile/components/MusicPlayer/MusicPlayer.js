import { StyleSheet, View, Image, Text} from "react-native";
import Slider from "@react-native-community/slider";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import AntDesign from "react-native-vector-icons/AntDesign";
import Songs from "./../../model/data";
import { useEffect, useState } from "react";

function MusicPlayer({ song }) {
  const [playing, setPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(Songs[0]);

  useEffect(() => {
    setPlaying(false)
  }, [song])

  return (
    <View style={styles.view}>
      <View style={styles.title}>
        <Image
          style={styles.imageTitle}
          source={require("./../../assets/tanBionica.jpg")}
        />
        <Text style={styles.textTitle}>
          {song ? song.data.title : "choose a song"}
        </Text>
      </View>
      <View style={styles.controls}>
        <AntDesign
          onPress={() => {
            if (0 !== currentSong.id) {
              setCurrentSong(Songs[currentSong.id - 1]);
            } else {
              setCurrentSong(Songs[Songs.length - 1]);
            }
          }}
          name="fastbackward"
          color="white"
          size={20}
        />
        {playing ? (
          <AntDesign
            onPress={() => {
              song.sound.pauseAsync();
              setPlaying(false);
            }}
            name="pausecircleo"
            color="white"
            size={30}
          />
        ) : (
          <AntDesign
            onPress={() => {
              song.sound.playAsync();
              setPlaying(true);
            }}
            name="playcircleo"
            color="white"
            size={30}
          />
        )}

        <AntDesign
          onPress={() => {
            if (Songs.length !== currentSong.id + 1) {
              setCurrentSong(Songs[currentSong.id + 1]);
            } else {
              setCurrentSong(Songs[0]);
            }
          }}
          name="fastforward"
          color="white"
          size={20}
        />
      </View>
      <View style={styles.sliderSection}>
        <Slider
          thumbTintColor="white"
          minimumTrackTintColor="white"
          maximumTrackTintColor="white"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: wp(40),
    height: hp(20),
    padding: wp(1),
    marginHorizontal: wp(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: "100%",
    height: "33%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageTitle: {
    width: hp(5),
    height: hp(5),
    borderRadius: 500,
    zIndex: 1,
  },
  textTitle: {
    maxWidth: wp(40),
    paddingRight: wp(3),
    paddingLeft: wp(10),
    paddingVertical: hp(0.2),
    marginLeft: -wp(9),
    borderRadius: 500,
    textAlign: "center",
    backgroundColor: "white",
    color: "#006E95",
    fontWeight: "bold",
  },
  controls: {
    width: "100%",
    height: "33%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderSection: {
    width: wp(46),
  },
});

export default MusicPlayer;
