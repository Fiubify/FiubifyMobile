import { StyleSheet, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import { AllSongs} from "./AllSongs";
import { useEffect, useState } from "react";
import { getSongs } from "../../src/fetchSongs";

function Home({ setSong }) {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    async function aux() {
      const fetchedSongs = await getSongs();
      console.log(fetchedSongs);
      setSongs(fetchedSongs.data);
    }

    aux().then();
  }, []);
  return (
    <View style={styles.view}>
      <AllSongs setSong={setSong} songs={songs}/>
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
