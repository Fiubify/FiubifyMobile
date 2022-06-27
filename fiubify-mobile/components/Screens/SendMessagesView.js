import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import UiTextInput from "../ui/UiTextInput";
import UiButton from "../ui/UiButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToHome } from "../../src/navigates";
import { database } from "../../firebase";
import { ref, set } from "firebase/database";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function SendMessagesView({ navigation, route }) {
  const { userUId, token, emisorName, receptorName } = route.params;
  const [message, setMessage] = useState("");

  function writeUserData(userId, emisorName, receptorName, message) {
    set(ref(database, "users/" + userId), {
      emisor: emisorName,
      receptor: receptorName,
      message: message,
    });
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
            writeUserData(userUId, emisorName, receptorName, message);
            navigateToHome(userUId, token, navigation);
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
