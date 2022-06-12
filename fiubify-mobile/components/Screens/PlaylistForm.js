import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import React from "react";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

export function PlaylistForm({ navigation, route }) {
  // TODO: Ver todos los campos
  const { userUId, token } = route.params;

  return (
    <View style={styles.view}>
      <Text style={styles.link} onPress={() => navigation.navigate("Profile", { userUId, token })}>
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
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
  facebookButton: {
    backgroundColor: "#004595",
  },
  middle: {
    width: wp(90),
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: hp(2),
  },
  line: {
    backgroundColor: "#006E95",
    height: 2,
    flex: 1,
    alignSelf: "center",
  },
  text: {
    color: "#006E95",
    fontWeight: "bold",
    alignSelf: "center",
    paddingHorizontal: 15,
    fontSize: 20,
    justifyContent: "center",
  },
  pickers: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    width: wp(44),
    marginBottom: hp(2),
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
  },
  labelContainerStyle: {
    width: wp(39),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
  birthday: {
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  birthdayButton: {
    width: wp(25),
    backgroundColor: "white",
    borderColor: "#006E95",
    borderWidth: 2,
  },
  birthdayText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#006E95",
  },
  terms: {
    marginVertical: hp(2),
    padding: 0,
    width: wp(90),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  terms_text: {
    color: "#006E95",
    fontSize: 18,
  },
  bold: {
    fontWeight: "bold",
  },
  signUp: {
    backgroundColor: "#006E95",
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
  text_input: {
    marginBottom: 10,
  },
});
