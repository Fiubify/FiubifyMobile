import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView } from "react-native";
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
import {
  navigateToAlbumForm, navigateToEntry,
  navigateToHome,
  navigateToSongForm,
  navigateToSubscriptionForm,
} from "../../src/navigates";

export default function MyProfile({ navigation, route }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const { userUId, token } = route.params;

  useEffect(() => {
    getUser(userUId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [userUId]);

  if (!loading)
    return (
      <View style={styles.view}>
        <Text
          style={styles.link}
          onPress={() =>
            navigateToHome(userUId, token, navigation)
          }
        >
          <MaterialIcons name="arrow-back-ios" />
          Back
        </Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
        >
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

          <View style={styles.plan}>
            <Info
              containerStyles={styles.containerStyle}
              title="Plan"
              contain={user.plan}
              icon={user.plan === "Free" ? "cash-remove" : "diamond-stone"}
            />
            <MaterialIcons
              name="edit"
              color="#006E95"
              size={20}
              onPress={() => {
                navigateToSubscriptionForm(userUId, token, user.plan, navigation);
              }}
            />
          </View>

          {user.role === "Artist" ? (
            <View style={styles.artist}>
              <View style={styles.artistCreate}>
                <UiButton
                  title="Load Song"
                  pressableStyle={styles.loadSong}
                  textStyle={styles.textStyle}
                  onPress={() =>
                    navigateToSongForm(userUId, token)
                  }
                />
                <UiButton
                  title="New Album"
                  pressableStyle={styles.loadSong}
                  textStyle={styles.textStyle}
                  onPress={() =>
                    navigateToAlbumForm(userUId, token, navigation)
                  }
                />
              </View>
              <UiButton
                title="Log Out"
                pressableStyle={styles.buttonListener}
                onPress={() => {
                  signOut(auth)
                    .then(() => {
                      navigateToEntry(navigation)
                    })
                    .catch((_error) => {
                      navigateToEntry(navigation)
                    });
                }}
              />
            </View>
          ) : (
            <UiButton
              title="Log Out"
              pressableStyle={styles.buttonListener}
              onPress={() => {
                signOut(auth)
                  .then(() => {
                    navigateToEntry(navigation)
                  })
                  .catch((_error) => {
                    navigateToEntry(navigation)
                  });
              }}
            />
          )}
        </ScrollView>
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
    marginTop: 20,
  },
  plan: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#006E95",
    borderBottomWidth: 2,
  },
  containerStyle: {
    width: "70%",
    borderBottomWidth: 0,
  },
  imageSection: {
    height: hp(20),
    marginBottom: hp(7),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(7),
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
    marginBottom: hp(2),
  },
  loadSong: {
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
  scroll: {
    width: "100%",
    display: "flex",
  },
  scrollContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
