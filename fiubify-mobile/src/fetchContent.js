import axios from "axios";
import { BASE_URL } from "../constantes";

export async function getSongs() {
  try {
    let response = await axios.get(
      `${BASE_URL}/contents/songs`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getSongsWithTitle(title, tierFilter) {
  try {
    let response;
    if (tierFilter) {
      response = await axios.get(
        `${BASE_URL}/contents/songs?title=${title}&tier=${tierFilter}`,
      );
    } else {
      response = await axios.get(
        `${BASE_URL}/contents/songs?title=${title}`,
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    } else {
      return { data: [] };
    }
  }
}

export async function getContentByGenre(genre, tierFilter) {
  let songs = [];
  let albums = [];
  let responseSongs;
  let responseAlbums;

  try {
    if (tierFilter) {
      responseSongs = await axios.get(
        `${BASE_URL}/contents/songs?genre=${genre}&tier=${tierFilter}`,
      );
    } else {
      responseSongs = await axios.get(
        `${BASE_URL}/contents/songs?genre=${genre}`,
      );
    }
    songs = responseSongs.data.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
  }

  try {
    if (tierFilter) {
      responseAlbums = await axios.get(
        `${BASE_URL}/contents/albums?genre=${genre}&tier=${tierFilter}`,
      );
    } else {
      responseAlbums = await axios.get(
        `${BASE_URL}/contents/albums?genre=${genre}`,
      );
    }
    albums = responseAlbums.data.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    }
  }

  return { data: { songs: songs, albums: albums } };
}

export async function getAlbumById(id) {
  try {
    let response = await axios.get(
      `${BASE_URL}/contents/albums/${id}`,
    );
    return response.data;
  } catch (e) {
    throw e;
  }
}

export async function getAlbumsWithTitle(title, tierFilter) {
  try {
    let response;
    if (tierFilter) {
      response = await axios.get(
        `${BASE_URL}/contents/albums?title=${title}&tier=${tierFilter}`,
      );
    } else {
      response = await axios.get(
        `${BASE_URL}/contents/albums?title=${title}`,
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    } else {
      return { data: [] };
    }
  }
}

export async function getAlbumsByArtist(uid) {
  try {
    let response;
    response = await axios.get(
      `${BASE_URL}/contents/albums?artistId=${uid}`);
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e;
    } else {
      return { data: [] };
    }
  }
}

export async function getFavouriteSongs(uid, token) {
  try {
    let response;
    response = await axios.get(
      `${BASE_URL}/contents/favourites/${uid}`,
      {
        params: {
          token: token,
        },
      });
    return response.data;
  } catch (e) {
    console.log(e)
    throw e;
  }
}

export async function deleteFavouriteSong(uid, songId) {
  try {
    await axios.delete(
      `${BASE_URL}/contents/favourites/${uid}/remove-song`,
      {
        data: {
          songId: songId,
        },
      });
  } catch (e) {
    throw e;
  }
}

export async function addFavouriteSong(uid, songId, token) {
  try {
    await axios.post(
      `${BASE_URL}/contents/favourites/${uid}/add-song`,
      {
        songId: songId,
        token: token,
      },
    );
  } catch (e) {
    throw e;
  }
}