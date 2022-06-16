import { contentMetricsUrl, userMetricsUrl } from "../constantes";
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
  } catch (e) {throw e}
}

export async function postSongEvent(action, genre, tier, user, song, album) {
  try {
    await axios.post(
      contentMetricsUrl,
      {
        action: action,
        genre: genre,
        tier: tier,
        user: user,
        song: song,
        album: album,
      }
    );
  } catch (e) {throw e}
}

export async function postAlbumEvent(action, genre, tier, user, album) {
  try {
    await axios.post(
      contentMetricsUrl,
      {
        action: action,
        genre: genre,
        tier: tier,
        user: user,
        album: album,
      }
    );
  } catch (e) {throw e}
}