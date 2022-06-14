import axios from "axios";

export async function getProfilesWith(name, _tierFilter) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/user?name=${name}`,
    );
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
    return { data: [] };
  }
}