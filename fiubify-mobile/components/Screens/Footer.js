import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FooterButton from "./FooterButton";

function Footer({ currentScreen, setCurrentScreen }) {
  return (
    <View style={styles.view}>
      <FooterButton
        changeCurrent={() => setCurrentScreen("HOME")}
        icon={currentScreen === "HOME" ? "home" : "home-outline"}
        title="Home"
      />
      <FooterButton
        changeCurrent={() => setCurrentScreen("SEARCH")}
        icon={currentScreen === "SEARCH" ? "magnify-scan" : "magnify"}
        title="Search"
      />
      <FooterButton
        changeCurrent={() => setCurrentScreen("MY-LIBRARY")}
        icon={
          currentScreen === "MY-LIBRARY"
            ? "bookmark-multiple"
            : "bookmark-multiple-outline"
        }
        title="My Library"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(15),
    backgroundColor: "#006E95",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: "flex",
    flexDirection: "row",
    zIndex: 1,
  },
});

export default Footer;
