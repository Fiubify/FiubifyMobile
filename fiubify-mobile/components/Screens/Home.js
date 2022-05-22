import { View } from "react-native";
import { StyleSheet } from "react-native";
import Profile from "./../profile/Profile";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Header from "./Header";

function Home({ setCurrentScreen }) {
  return (
    <View style={styles.view}>
      <Header setCurrentScreen={setCurrentScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Home;
