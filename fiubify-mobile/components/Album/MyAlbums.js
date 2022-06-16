import { useEffect, useState } from "react";
import { getUser } from "../../src/GetUser";
import { getAlbumsByArtist } from "../../src/fetchContent";
import { AllAlbums } from "../Screens/AllAlbums";

export function MyAlbums({ userUid, setData, setCurrentScreen }) {
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState({ role: "Not-Fetched" });

  useEffect(() => {
    getUser(userUid).then((user) => {
      setUser(user);
      getAlbumsByArtist(userUid).then((albums) => {
        setAlbums(albums.data);
      }).catch((e) => {throw e});
    }).catch((e) => {throw e});
  }, []);

  if (user.role === "Artist" && albums.length > 0) {
    return (
      <AllAlbums albums={albums} setAlbum={(album) => {
        setData({ album: album });
        setCurrentScreen("ALBUM-VIEW");
      }} />
    );
  }
  return null;
}