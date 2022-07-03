import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { database } from "../../firebase";
import { getUser } from "../../src/GetUser";
import { navigateToHome } from "../../src/navigates";
import Message from "../Message/Message";
import UiTextInput from "../ui/UiTextInput";
import SongComment from "./SongComment";

function SongMessagesView({ navigation, route }) {
  const { userUId, token, song } = route.params;
  const [message, setMessage] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userUId).then((user) => {
      setUser(user);
    });
  }, [userUId]);

  function writeSongData(songId, user, message) {
    const sendListRef = ref(database, "/songs/" + songId);
    const newSendRef = push(sendListRef);
    set(newSendRef, {
      user: user.name + " " + user.surname,
      userUId: user.uid,
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

  function getRecievedMessages(userUId) {
    const recvCountRef = ref(database, "/songs/" + song._id);
    var render = [];
    var recvData;
    onValue(recvCountRef, (snapshot) => {
      recvData = snapshot;
    });

    if (!recvData?.val()) {
      render.push(<Text key={1}>There is not comments</Text>);
    } else {
      recvData.forEach((childSnapshot) => {
        render.push(
          <SongComment
            key={childSnapshot.key}
            data={childSnapshot.val()}
            songId={song._id}
            commentKey={childSnapshot.key}
            whenDone={() => navigateToHome(userUId, token, navigation)}
            userUId={userUId}
          />
        );
      });
    }

    return render;
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
      <Text style={styles.title}>{song.title}</Text>
      <Text style={styles.link}>Comments</Text>
      <View style={styles.scrollView}>
        <ScrollView style={styles.scroll}>
          {getRecievedMessages(userUId).reverse()}
        </ScrollView>
      </View>
      <View style={styles.middle}>
        <View style={styles.line} />
      </View>
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
            writeSongData(song._id, user, message);
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
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
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
    width: "90%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#006E95",
  },
  scrollView: {
    width: wp(90),
    height: hp(50),
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
  middle: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: hp(2),
  },
  line: {
    backgroundColor: "#006E95",
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
});

export default SongMessagesView;
