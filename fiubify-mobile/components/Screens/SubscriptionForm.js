import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import UiButton from "../ui/UiButton";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Selector from "../ui/UiSelect";
import { BASE_URL } from "../../constantes";

export function SubscriptionForm({ navigation, route }) {
  const tiers = ["Free", "Premium"];
  const { userUId, token, tier } = route.params;
  const [tierToChange, setTierToChange] = useState(tier)

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() =>
          navigation.navigate("MyProfile", {
            userUId: userUId,
            token
          })
        }
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Change subscription</Text>
      <Selector
        data={tiers}
        setValue={setTierToChange}
        defaultValue={tierToChange}
        valueStyle={styles.value}
        labelContainerStyle={styles.labelContainerStyle}
      />
      <UiButton
        title="Change"
        pressableStyle={styles.upload}
        onPress={() => {
          send(token, tierToChange, navigation);
        }}
      />
    </View>
  );

  async function send(token, tier, navigation) {
    let url =
      `${BASE_URL}/user/${userUId}/change-subscription`;
    const body = {
      token,
      plan: tier,
    };
    let request = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    };

    let response = await fetch(url, request);

    if (response.ok) {
      navigation.navigate("Home", {
        uid: userUId,
        token: token,
      });
    } else {
      console.error(await response.json());
      alert(response.statusText);
    }
  }
}
const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CAE3EA",
  },
  text_input: {
    marginBottom: hp(2),
  },
  upload: {
    backgroundColor: "#006E95",
  },
  title: {
    fontSize: 40,
    color: "#006E95",
    fontWeight: "bold",
    marginBottom: hp(4),
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
  value: {
    width: wp(90),
    marginBottom: hp(2),
    paddingVertical: 10,
    paddingHorizontal: wp(5),
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: "white",
  },
  labelContainerStyle: {
    width: wp(85),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#CAE3EA",
    borderBottomWidth: 1,
  },
});
