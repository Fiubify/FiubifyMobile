import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UiButton from "./ui/UiButton";
import UiLogo from "./ui/UiLogo";

export default function MainScreen() {
  return (
    <View style={styles.view}>
      <UiLogo logoStyles={styles.Logo} />
      <View style={styles.ButtonView}>
        <UiButton pressableStyle={styles.signin} title="Sign In" />
        <Text style={styles.text}>Or</Text>
        <UiButton
          pressableStyle={styles.login}
          textStyle={styles.loginText}
          title="Log In"
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
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  Logo: {

  },
  ButtonView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  signin: {
    backgroundColor: "#006E95",
    marginBottom: 20,
  },
  login: {
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    marginTop: 20,
  },
  loginText: {
    color: "#006E95",
  },
  text: {
    color: "#006E95",
    fontSize: 20,
    fontWeight: "bold",
  },
});
