import { useEffect, useState } from "react";
import Home from "./Home";
import Profile from "../profile/Profile";
import Header from "./Header";
import Footer from "./Footer";
import { StyleSheet, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createNativeStackNavigator();

function ScreenController({ route }) {
  const {uid} = route.params
  const [currentScreen, setCurrentScreen] = useState("HOME");
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (currentScreen === "HOME") {
      setComponent(<Home setCurrentScreen={setCurrentScreen} />);
    } else if (currentScreen === "SEARCH") {
      setComponent(null);
    } else {
      setComponent(null);
    }
  }, [currentScreen]);

  if (currentScreen === "PROFILE") {
    return <Profile userUId={uid} setCurrentScreen={setCurrentScreen} />;
  } else
    return (
      <View style={styles.view}>
        <Header setCurrentScreen={setCurrentScreen} />
        {component}
        <Footer
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
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
    justifyContent: "space-between",
  },
});

export default ScreenController;
