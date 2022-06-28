import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getWalletBalance(walletAddress) {
  try {
    let response = await axios.get(
      `${BASE_URL}/payments/${walletAddress}`
    );
    return response.data;
  } catch (e) {
    console.log(e)
    throw e;
  }
}
