import { StyleSheet, Text, View } from "react-native";
import UiButton from "../ui/UiButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

//TODO: mostrar todos los profiles (si son muchos, poder scrollear para abajo)

function ListedProfile({ profile, onPress }) {
  return (
    <View style={styles.profileContainer}>
      <Ionicons
        style={styles.profileIcon}
        name="md-person-outline"
        size={20}
        color="white"
      />
      <UiButton
        pressableStyle={styles.profiles}
        textStyle={styles.profilesText}
        title={profile.name}
        onPress={() => {
          onPress(profile.uid);
        }}
      />
    </View>
  );
}

export function AllProfiles({ profiles, navigation, currentUserId }) {
  if (profiles) {
    if (profiles.length > 0) {
      return (
        <View style={styles.view}>
          {profiles.map((profile) => (
            <ListedProfile
              key={profile.uid}
              profile={profile}
              onPress={(uid) => {
                navigation.navigate("ExternProfile", {
                  userUId: uid,
                  currentUserUId: currentUserId,
                });
              }}
            />
          ))}
        </View>
      );
    } else {
      return <Text>No Content available</Text>;
    }
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    margin: 10,
    display: "flex",
    backgroundColor: "#CAE3EA",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileContainer: {
    width: "90%",
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
    borderRadius: 25,
  },
  profileIcon: {
    backgroundColor: "#006E95",
    borderRadius: 25,
    padding: "3%",
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
  },
  profiles: {
    width: "85%",
    backgroundColor: "white",
    elevation: 0,
  },
  profilesText: {
    color: "#006E95",
  },
  searchBar: {
    width: "100%",
    marginTop: hp(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
