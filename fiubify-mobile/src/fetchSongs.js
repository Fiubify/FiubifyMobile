import axios from "axios";

export async function getSongs() {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/songs`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getSongsWith(title) {
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/songs?title=${title}`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
