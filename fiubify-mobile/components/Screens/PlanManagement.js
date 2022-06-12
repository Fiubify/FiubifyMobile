import { useEffect, useState } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { getUser } from "../../src/GetUser"

export default function PlanManagement({navigation, route}) {
  const { user, token } = route.params
  const [loading, setLoading] = useState(false)

  return (
    <View style={styles.view}>
      <Text>
        {user.name} {user.surname}: {user.plan}
      </Text>
    </View>
  )
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
  }
})