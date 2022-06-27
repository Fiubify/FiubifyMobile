import React, { useState } from "react";
import { View, Text } from "react-native";
import UiTextInput from "./../ui/UiTextInput";
import UiButton from "./../ui/UiButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { navigateToHome } from "../../src/navigates";
import { database } from "../../firebase";
import { ref, set } from "firebase/database";

function MessagesView({ navigation, route }) {
  const { userUId, token, name } = route.params;
  const [message, setMessage] = useState("");

  function writeUserData(userId, name, message) {
    set(ref(database, "users/" + userId), {
      username: name,
      message: message,
    });
  }

  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text onPress={() => navigateToHome(userUId, token, navigation)}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <UiTextInput onChange={setMessage} placeholder="Insert your message" />
      <UiButton
        title="Send"
        onPress={() => writeUserData(userUId, name, message)}
      />
    </View>
  );
}

export default MessagesView;
