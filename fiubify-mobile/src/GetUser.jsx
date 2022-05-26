import axios from "axios";

export async function getUser(userId) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/user/${userId}`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
