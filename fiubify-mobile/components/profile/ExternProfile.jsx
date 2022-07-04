import { useEffect, useState } from "react";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import Info from "./Info";
import UiButton from "../ui/UiButton";
import { getUser } from "../../src/GetUser";
import { navigateToHome, navigateToSendMessagesView } from "../../src/navigates";

export default function ExternProfile({ navigation, route }) {
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const { userUId, currentUserUId, token } = route.params;

  useEffect(() => {
    getUser(currentUserUId).then((currentUser) => {
      setCurrentUser(currentUser);
    });
    getUser(userUId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [userUId]);

  const donateButton = () => {
    if (user.role === "Artist") {
      return (
        <UiButton
          title="Donate"
          pressableStyle={styles.pressableStyle}
          textStyle={styles.textStyle}
          onPress={() => this.setDonationModalVisible(true)}
        />
      )
    }
  }

  if (!loading)
    return (
      <View style={styles.view}>
        <Modal 
          animationType="slide"
          transparent={true}
          visible={donationModalVisible}
          onRequestClose={() => this.setDonationModalVisible(false)}
        >
          <UiButton
            title="Close"
            pressableStyle={styles.pressableStyle}
            textStyle={styles.textStyle}
            onPress={() => this.setDonationModalVisible(false)}
            >
          </UiButton>
        </Modal>
        <View style={styles.topSection}>
          <Text
            style={styles.link}
            onPress={() => navigateToHome(userUId, token, navigation)}
          >
            <MaterialIcons name="arrow-back-ios" />
            Back
          </Text>
          <MaterialIcons
            name="message"
            color="#006E95"
            size={30}
            onPress={() => {
              navigateToSendMessagesView(
                currentUserUId,
                userUId,
                token,
                currentUser.name,
                user.name,
                navigation
              );
            }}
          />
        </View>
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
        {donateButton()}
        <Info
          title="Birthdate"
          contain={user.birthdate}
          icon="calendar-heart"
        />

        <Info
          title="Plan"
          contain={user.plan}
          icon={user.plan === "Free" ? "cash-remove" : "diamond-stone"}
        />
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
  topSection: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    width: wp(30),
    fontWeight: "bold",
    fontSize: 16,
    color: "#006E95",
    marginBottom: hp(2),
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  imageSection: {
    height: hp(20),
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
  artist: {
    width: wp(90),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  artistCreate: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  loading: {
    fontSize: 30,
    color: "#006E95",
  },
  buttonListener: {
    width: wp(90),
    marginTop: hp(2),
    backgroundColor: "#006E95",
    borderColor: "#006E95",
    borderWidth: 2,
  },
  pressableStyle: {
    width: wp(44),
    marginTop: hp(2),
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    paddingHorizontal: 0,
  },
  textStyle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
});
