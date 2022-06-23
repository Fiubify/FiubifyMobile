import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getProfilesWith(name, _tierFilter) {
  try {
    let response = await axios.get(
      `${BASE_URL}/user?name=${name}`,
    );
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
    return { data: [] };
  }
}

export async function getArtistsWith(name, _tierFilter) {
  try {
    let response = await axios.get(
      `${BASE_URL}/user?name=${name}&role=Artist`,
    );
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
    return { data: [] };
  }
}
