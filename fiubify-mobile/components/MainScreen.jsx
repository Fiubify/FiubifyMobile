import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UiButton from "./ui/UiButton";
import UiLogo from "./ui/UiLogo";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { navigateToLoginWithSender } from "../src/navigates";


function MainScreen({ navigation }) {
  const [_expoPushToken, setExpoPushToken] = useState("");
  const [sender, setSender] = useState(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    Notifications.addNotificationResponseReceivedListener(response => {
      setSender(response.notification.request.content.data);
    });
  }, []);

  return (
    <View style={styles.view}>
      <UiLogo logoStyles={styles.Logo} />
      <View style={styles.ButtonView}>
        <UiButton
          pressableStyle={styles.signUp}
          title="Sign Up"
          onPress={() => {
            navigation.navigate("Registration");
          }}
        />
        <Text style={styles.text}>Or</Text>
        <UiButton
          pressableStyle={styles.logIn}
          textStyle={styles.logInText}
          title="Log In"
          onPress={() => {
              navigateToLoginWithSender(navigation, sender);
          }}
        />
      </View>
    </View>
  );
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  await Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });


  return token;
}


const mapStateToProps = (state) => {
  return { logged_in: state.loginState.logged_in };
};

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#CAE3EA",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Logo: {},
  ButtonView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signUp: {
    backgroundColor: "#006E95",
    marginBottom: 20,
  },
  logIn: {
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    marginTop: 20,
  },
  logInText: {
    color: "#006E95",
  },
  text: {
    color: "#006E95",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(MainScreen);
