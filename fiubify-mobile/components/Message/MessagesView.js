import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToHome, navigateToMyProfile } from "../../src/navigates";
import { database } from "../../firebase";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { onValue, ref } from "firebase/database";
import Message from "./Message";

export default function MessagesView({ navigation, route }) {
  const { userUId, token } = route.params;

  //ARREGLAR PRIMERA VEZ QUE ENTRAS
  function getSendedMessages() {
    const sendCountRef = ref(database, "/users/sended/" + userUId);
    var render = [];
    var sendData;
    onValue(sendCountRef, (snapshot) => {
      sendData = snapshot;
    });

    if (!sendData) {
      render.push(<Text key={0}>There is not sended data</Text>);
    } else {
      sendData.forEach((childSnapshot) => {
        render.push(
          <Message key={childSnapshot.key} data={childSnapshot.val()} />
        );
      });
    }
    return render;
  }

  //ARREGLAR PRIMERA VEZ QUE ENTRAS
  function getRecievedMessages() {
    const recvCountRef = ref(database, "/users/recieved/" + userUId);
    var render = [];
    var recvData;
    onValue(recvCountRef, (snapshot) => {
      recvData = snapshot;
    });

    if (!recvData) {
      render.push(<Text key={1}>There is not recieved data</Text>);
    } else {
      recvData.forEach((childSnapshot) => {
        render.push(
          <Message key={childSnapshot.key} data={childSnapshot.val()} />
        );
      });
    }

    return render;
  }

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigateToMyProfile(userUId, token, navigation)}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>

      <Text style={[styles.link, styles.title]}>Recibidos</Text>
      <View style={styles.scrollView}>
        <ScrollView style={styles.scroll}>
          {getRecievedMessages().reverse()}
        </ScrollView>
      </View>
      <Text style={[styles.link, styles.title]}>Enviados</Text>
      <View style={styles.scrollView}>
        <ScrollView style={styles.scroll}>
          {getSendedMessages().reverse()}
        </ScrollView>
      </View>
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
  title: {
    fontSize: 20,
  },
  scrollView: {
    width: wp(90),
    height: hp(30),
  },
  scroll: {
    width: wp(90),
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