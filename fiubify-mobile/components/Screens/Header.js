import { View } from "react-native";
import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Ionicons from "react-native-vector-icons/Ionicons";
import UiLogo from "../ui/UiLogo";

function Header({ userUId, token, navigation, song }) {
  return (
    <View style={styles.view}>
      <View style={styles.logoSection}>
        <UiLogo logoStyles={styles.Logo} />
      </View>
      <MusicPlayer song={song} />
      <Ionicons
        onPress={() =>
          navigation.navigate("Profile", {
            userUId: userUId,
            token: token,
          })
        }
        name="person-circle-outline"
        color="white"
        size={70}
        style={styles.perfil}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(20),
    backgroundColor: "#006E95",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  logoSection: {
    width: hp(22),
    height: hp(22),
    marginLeft: -wp(8),
    padding: wp(6),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 500,
    borderColor: "#006E95",
    borderWidth: 2,
    backgroundColor: "white",
  },
  Logo: {
    width: "100%",
    height: "100%",
  },
  perfil: {
    display: "flex",
    alignSelf: "flex-end",
  },
});

export default Header;
