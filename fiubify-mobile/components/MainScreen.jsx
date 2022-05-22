import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UiButton from "./ui/UiButton";
import UiLogo from "./ui/UiLogo";
import { connect } from "react-redux";
import LoginScreen from "./login/Screen.jsx";
import RegistrationForm from "./login/RegistrationForm";
import { useState } from "react";
import ScreenController from "./Screens/ScreenController";

function LoginDispatcher(props) {
  if (props.uid === "") {
    return (
      <LoginScreen
        currentForm={props.currentForm}
        setCurrent={props.setCurrent}
        setUid={props.setUid}
        uid={props.uid}
      />
    );
  } else {
    return <ScreenController uid={props.uid} />;
  }
}

function MainScreen(props) {
  const [currentForm, setCurrentForm] = useState("MAINSCREEN");
  const [uid, setUid] = useState("7Wx30Z2qRFTSnWWvG5dkmd8WhD42");

  if (currentForm === "LOGIN") {
    return (
      <LoginDispatcher
        uid={uid}
        setUid={setUid}
        currentForm={currentForm}
        setCurrent={setCurrentForm}
        logged_in={props.logged_in}
      />
    );
  } else if (currentForm === "SIGNUP") {
    return (
      <View style={styles.view}>
        <RegistrationForm
          setUid={setUid}
          backFunction={() => setCurrentForm("MAINSCREEN")}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <UiLogo logoStyles={styles.Logo} />
        <View style={styles.ButtonView}>
          <UiButton
            pressableStyle={styles.signUp}
            title="Sign Up"
            onPress={() => {
              setCurrentForm("SIGNUP");
            }}
          />
          <Text style={styles.text}>Or</Text>
          <UiButton
            pressableStyle={styles.logIn}
            textStyle={styles.logInText}
            title="Log In"
            onPress={() => {
              setCurrentForm("LOGIN");
            }}
          />
        </View>
      </View>
    );
  }
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
