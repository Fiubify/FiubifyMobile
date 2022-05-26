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
        changeCurrent={() => setCurrentScreen("LIBRARY")}
        icon={
          currentScreen === "LIBRARY"
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
    height: hp(20),
    marginBottom: hp(-3),
    backgroundColor: "#006E95",
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    zIndex: 1,
  },
});

export default Footer;
