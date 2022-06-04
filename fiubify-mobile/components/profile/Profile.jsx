import { useEffect, useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Info from "./Info";
import UiButton from "../ui/UiButton";
import { getUser } from "../../src/GetUser";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Profile({ currentUserId, userUId, setCurrentScreen, navigation }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(userUId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [userUId]);

  if (!loading)
    return (
      <View style={styles.view}>
        <Text style={styles.link} onPress={() => setCurrentScreen("HOME")}>
          <MaterialIcons name="arrow-back-ios" />
          Back
        </Text>
        <View style={styles.imageSection}>
          <Image
            style={styles.perfilImage}
            source={require("./../../assets/avatar.png")}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.title_text}>
            {user.name} {user.surname}
          </Text>
        </View>
        <Info title="Email" contain={user.email} icon="email-outline" />
        <Info
          title="Role"
          contain={user.role}
          icon={user.role === "Artist" ? "microphone-variant" : "headphones"}
        />
        <Info
          title="Birthdate"
          contain={user.birthdate}
          icon="calendar-heart"
        />
        <Info title="Plan" contain={user.plan} icon="cash-remove" />
        {user.role === "Artist" && currentUserId === userUId && (
          <UiButton
            title="LOAD SONG"
            pressableStyle={styles.button}
            onPress={() => setCurrentScreen("LOAD-SONG")}
          />
        )}
        <UiButton
          title="Log Out"
          pressableStyle={styles.button}
          onPress={() => {
            signOut(auth)
              .then(() => {
                navigation.navigate("Entry", {
                  uid: "",
                });
              })
              .catch((error) => {
                navigation.navigate("Entry", {
                  uid: "",
                });
                console.log(error);
              });
          }}
        ></UiButton>
      </View>
    );
  else
    return (
      <View style={styles.view}>
        <Text style={styles.loading}>Loading...</Text>
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
  },
  imageSection: {
    width: wp(90),
    height: hp(30),
    marginBottom: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  perfilImage: {
    width: wp(50),
    resizeMode: "contain",
  },
  title: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title_text: {
    fontSize: 30,
    color: "#006E95",
    fontWeight: "bold",
    textAlign: "justify",
  },
  description: {
    width: "90%",
    color: "#006E95",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
  button: {
    marginTop: hp(2),
    backgroundColor: "#006E95",
  },
});
