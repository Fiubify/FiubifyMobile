import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToHome } from "../../src/navigates";
import { database } from "../../firebase";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { onValue, ref } from "firebase/database";
import Message from "./Message";

export default function MessagesView({ navigation, route }) {
  const { userUId, token } = route.params;
  function getMessages() {
    const starCountRef = ref(database, "/users/" + userUId);
    var data;
    onValue(starCountRef, (snapshot) => {
      data = snapshot.val();
    });
    return <Message data={data} />;
  }

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigateToHome(userUId, token, navigation)}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      {getMessages()}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginBottom: hp(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  sendSection: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  messageInput: {
    width: wp(75),
    marginRight: "3%",
  },
  sendButton: {
    padding: "4%",
    backgroundColor: "#006E95",
    borderRadius: 20,
  },
});