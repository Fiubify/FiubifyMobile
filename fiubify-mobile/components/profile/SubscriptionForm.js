import React, { useEffect, useState } from "react";
import * as Clipboard from 'expo-clipboard'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import UiButton from "../ui/UiButton";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Selector from "../ui/UiSelect";
import { BASE_URL } from "../../constantes";
import { getWalletBalance } from "../../src/getWalletBalance";
import { navigateToHome, navigateToMyProfile } from "../../src/navigates";

export function SubscriptionForm({ navigation, route }) {
  const tiers = ["Free", "Premium"];
  const { userUId, token, tier, walletAddress } = route.params;
  const [tierToChange, setTierToChange] = useState(tier)
  const [balance, setBalance] = useState()

  useEffect(() => {
    getWalletBalance(walletAddress).then((balance) => {
      setBalance(balance);
    });
  }, [walletAddress]);

  return (
    <View style={styles.view}>
      <Text
        style={styles.link}
        onPress={() =>
          navigateToMyProfile(userUId, token, navigation)
        }
      >
        <MaterialIcons name="arrow-back-ios" />
        Back
      </Text>
      <Text style={styles.title}>Change subscription</Text>
      <Text style={styles.content} onPress={() => Clipboard.setString(walletAddress)}>
        <MaterialIcons name="assignment"/>
        {`${walletAddress} (${balance} ETH)`}
      </Text>
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
      `${BASE_URL}/user/${userUId}/upgrade-subscription`;
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
      navigateToHome(userUId, token, navigation);
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
    marginBottom: hp(2),
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
  content: {
    width: wp(90),
    fontWeight: "bold",
    fontSize: 12,
    color: "#006E95",
    marginBottom: hp(2),
    marginLeft: hp(2),
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
