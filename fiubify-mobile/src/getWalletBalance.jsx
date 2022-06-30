import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getWalletBalance(walletAddress) {
  try {
    let response = await axios.get(
      `${BASE_URL}/payments/wallet/${walletAddress}`
    );
    return response.data.data.balance;
  } catch (e) {
    console.log(e)
    throw e;
  }
}
