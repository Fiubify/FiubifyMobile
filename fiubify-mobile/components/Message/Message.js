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
        <View style={styles.messageSection}>
          <Text style={styles.message}>{data.message}</Text>
          <Text style={styles.time}>{data.time}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    minHeight: hp(10),
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
  messageSection: {
    width: wp(80),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  message: {
    width: "60%",
    fontSize: 18,
    color: "black",
  },
  time: {
    fontSize: 18,
    color: "black",
  },
});

export default Message;
