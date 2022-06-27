import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getUserByEmail(email) {
  try {
    let response = await axios.get(
      `${BASE_URL}/user/?email=${email}`
    );
    console.log("user by mail: ", response.data)
    return response.data;
  } catch (e) {
    throw e;
  }
}