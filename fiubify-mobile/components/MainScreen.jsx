import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import UiButton from "./ui/UiButton";
import UiLogo from "./ui/UiLogo";
import { connect } from "react-redux";

function MainScreen({ navigation }) {
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
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
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
