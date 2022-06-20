import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getUser(userId) {
  try {
    let response = await axios.get(
      `${BASE_URL}/user/${userId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}
