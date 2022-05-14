import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";

export default function Profile({ userId: userUId }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(userUId).then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, [userUId]);

  if (!loading) return <View>
    <Text>Email: {user.email}</Text>
    <Text>Role: {user.role}</Text>
    <Text>Name: {user.name}</Text>
    <Text>Surname: {user.surname}</Text>
    <Text>birthdate: {user.birthdate}</Text>
    <Text>plan: {user.plan}</Text>
  </View>;
  else return <View>
    <Text>Loading</Text>
  </View>;
}

async function getUser(userId) {
  try {
    let response = await axios.get(`https://fiubify-middleware-staging.herokuapp.com/user/${userId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}
