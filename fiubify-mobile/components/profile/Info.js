import { StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function Info({ contain, containerStyles, icon, title }) {
  return (
    <View style={[styles.container, containerStyles]}>
      <MaterialCommunityIcons
        style={styles.icon}
        name={icon}
        color="#006E95"
        size={30}
      />
      <Text style={styles.title}>{title}:</Text>
      <Text style={styles.description}>{contain}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: heightPercentageToDP(10),
    borderColor: "#006E95",
    borderBottomWidth: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    marginRight: widthPercentageToDP(3),
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
  description: {
    fontSize: 18,
    color: "#006E95",
  },
  icon: {
    marginRight: widthPercentageToDP(5),
    padding: widthPercentageToDP(2),
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    borderRadius: 500,
    textAlign: "center",
  },
});

export default Info;
