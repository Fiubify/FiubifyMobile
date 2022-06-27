import { contentMetricsUrl, userMetricsUrl } from "../constantes";
import axios from "axios";


export async function postUserEvent(action, type, uid) {
  try {
    await axios.post(
      userMetricsUrl,
      {
        action: action,
        type: type,
        userUId: uid,
      }
    );
  } catch (e) {throw e}
}

export async function postSongEvent(action, genre, tier, userUId, songId, songName, albumId, albumName) {
  try {
    await axios.post(
      contentMetricsUrl,
      {
        action: action,
        genre: genre,
        tier: tier,
        userUId: userUId,
        songId: songId,
        songName: songName,
        albumId: albumId,
        albumName: albumName
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