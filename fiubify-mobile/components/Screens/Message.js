import React from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

function Message({ data }) {
  if (!data) {
    Alert("No se pudo acceder a la data");
    return;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.emisor}>
          <Text style={styles.emisorText}>{data.emisor}</Text>
          <MaterialIcons
            style={styles.arrow}
            name="arrow-right-alt"
            color="#006E95"
            size={40}
          />
          <Text style={styles.emisorText}>{data.receptor}</Text>
        </View>
        <Text style={styles.message}>{data.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(10),
    padding: "5%",
    marginTop: "5%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "white",
  },
  emisor: {
    width: wp(100),
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  emisorText: {
    fontSize: 20,
    color: "#006E95",
    fontWeight: "bold",
  },
  arrow: {
    marginTop: -5,
  },
  message: {
    fontSize: 18,
    color: "black",
  },
});

export default Message;
