import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

function FooterButton({ icon, title, changeCurrent }) {
  return (
    <View style={styles.iconView}>
      <MaterialCommunityIcons
        onPress={changeCurrent}
        name={icon}
        color="white"
        size={40}
      />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconView: {
    width: "33%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
});

export default FooterButton;
