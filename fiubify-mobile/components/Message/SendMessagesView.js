import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToHome } from "../../src/navigates";
import { database } from "../../firebase";
import { push, ref, set } from "firebase/database";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SendMessagesView({ navigation, route }) {
  const { senderUId, recieverUId, token, emisorName, receptorName } =
    route.params;
  const [message, setMessage] = useState("");

  function writeUserData(
    senderUId,
    recieverUId,
    emisorName,
    receptorName,
    message
  ) {
    const sendListRef = ref(database, "/users/sended/" + senderUId);
    const recvListRef = ref(database, "/users/recieved/" + recieverUId);
    const newSendRef = push(sendListRef);
    const newRecvRef = push(recvListRef);
    set(newSendRef, {
      emisor: emisorName,
      receptor: receptorName,
      message: message,
      time: time(),
    });
    set(newRecvRef, {
      emisor: emisorName,
      receptor: receptorName,
      message: message,
      time: time(),
    });
  }

  function time() {
    const today = new Date();
    const hours = (today.getHours() < 10 ? "0" : "") + (today.getHours() - 3);
    const minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    return hours + ":" + minutes;
  }

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() => navigateToHome(senderUId, token, navigation)}
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <View style={styles.sendSection}>
        <UiTextInput
          style={styles.messageInput}
          onChange={setMessage}
          placeholder="Insert your message"
          defaultValue=""
        />
        <MaterialIcons
          style={styles.sendButton}
          name="send"
          color="white"
          size={20}
          onPress={() => {
            writeUserData(
              senderUId,
              recieverUId,
              emisorName,
              receptorName,
              message
            );
            navigateToHome(senderUId, token, navigation);
          }}
        />
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
