import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { AllSongs} from "./AllSongs";
import { getSongs } from "../../src/fetchSongs";

function Home({ setSong }) {
  return (
    <View style={styles.view}>
      <AllSongs setSong={setSong} wayToSearch={getSongs}/>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: hp(100),
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },
});

export default Home;
