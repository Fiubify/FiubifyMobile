import { userMetricsUrl } from "../constantes";
import axios from "axios";


export async function postUserEvent(action, type) {
  try {
    await axios.post(
      userMetricsUrl,
      {
        action: action,
        type: type,
      }
    );
    console.log("posted action-type: ", action, "-", type);
  } catch (e) {throw e}
}