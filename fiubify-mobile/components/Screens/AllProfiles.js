import { StyleSheet, Text, View } from "react-native";
import UiButton from "../ui/UiButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

//TODO: no mostrar los botones de "My Profile" al visualizar el perfil de otra persona

function ListedProfile({ profile, onPress }) {
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
                              currentUserId,
                            }) {
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
