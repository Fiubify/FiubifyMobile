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

export async function getSongsWithTitle(title, tierFilter) {
  try {
    let response;
    if (tierFilter) {
      response = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?title=${title}&tier=${tierFilter}`,
      );
    } else {
      response = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?title=${title}`,
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e
    } else {
      return { data: [] }
    }
  }
}

export async function getSongsWithGenre(genre, tierFilter) {
  try {
    let response;
    if (tierFilter) {
      response = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?genre=${genre}&tier=${tierFilter}`,
      );
    } else {
      response = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?genre=${genre}`,
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e
    } else {
      return { data: [] }
    }
  }
}

export async function getContentByGenre(genre, tierFilter) {
  let songs = [];
  let albums = [];
  let responseSongs;
  let responseAlbums;
  if (tierFilter) {
    try {
      responseSongs = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?genre=${genre}&tier=${tierFilter}`,
      );
      songs = responseSongs.data.data;
    } catch (e) {
      if (e.response.status !== 404) {
        throw e
      }
    }
    try {
      responseAlbums = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/albums?genre=${genre}&tier=${tierFilter}`,
      );
      albums = responseAlbums.data.data;
    } catch (e) {
      if (e.response.status !== 404) {
        throw e
      }
    }
  } else {
    try {
      responseSongs = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/songs?genre=${genre}`,
      );
      songs = responseSongs.data.data;
    } catch (e) {
      if (e.response.status !== 404) {
        throw e
      }
    }
    try {
      responseAlbums = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/albums?genre=${genre}`,
      );
      albums = responseAlbums.data.data;
    } catch (e) {
      if (e.response.status !== 404) {
        throw e
      }
    }
  }
  return {data: {songs: songs, albums: albums}};
}

export async function getAlbumById(id){
  try {
    let response = await axios.get(
      `https://fiubify-middleware-staging.herokuapp.com/contents/albums/${id}`,
    );
    console.log(response.data);
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
        `https://fiubify-middleware-staging.herokuapp.com/contents/albums?title=${title}&tier=${tierFilter}`,
      );
    } else {
      response = await axios.get(
        `https://fiubify-middleware-staging.herokuapp.com/contents/albums?title=${title}`,
      );
    }
    return response.data;
  } catch (e) {
    if (e.response.status !== 404) {
      throw e
    } else {
      return { data: [] }
    }
  }
}
