import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import axios from "axios";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Info from "./Info";
import UiButton from "../ui/UiButton";

export default function Profile({userUId, setCurrentScreen }) {
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
        {(user.role === "Artist") && <UiButton onPress={() => setCurrentScreen("LOAD-SONG")}></UiButton>}
      </View>
    );
  else
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
}

async function getUser(userId) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/user/${userId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    marginTop: hp(10),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
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
});
