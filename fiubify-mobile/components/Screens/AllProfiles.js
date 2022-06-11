import { StyleSheet, Text, View } from "react-native";
import UiButton from "../ui/UiButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

function ListedProfile({ profile, onPress }) {
  console.log(profile);
  return (
    <UiButton
      pressableStyle={styles.button}
      title={profile.name}
      onPress={() => {
        onPress(profile.uid);
      }}
    />
  );
}

export function AllProfiles({
                              profiles,
                              navigation,
                              setOtheruid,
                              token,
                            }) {
  if (profiles.length > 0) {
    console.log("ENTRA");
    return (
      <View style={styles.view}>
        {profiles.map((profile) => (
          <ListedProfile
            key={profile.uid}
            profile={profile}
            onPress={(uid) => {
              setOtheruid(uid);
              navigation.navigate("Profile", {
                userUId: uid,
                token: token,
              });
            }}
          />
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.view}>
        <Text style={styles.loading}>Loading...</Text>
      </View>
    );
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
  searchBar: {
    width: "100%",
    marginTop: hp(2),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    marginBottom: hp(2),
  },
  button: {
    backgroundColor: "#006E95",
    margin: 10
  },
});
