import { useEffect, useState } from "react";
import { getUser } from "../../src/GetUser";
import { getAlbumsByArtist } from "../../src/fetchContent";
import { AllAlbums } from "./AllAlbums";
import { goToScreenAlbumView } from "../../src/navigates";

export function MyAlbums({
  userUId,
  token,
  navigation,
  setData,
  setCurrentScreen,
}) {
  const [albums, setAlbums] = useState([]);
  const [user, setUser] = useState({ role: "Not-Fetched" });

  useEffect(() => {
    getUser(userUId)
      .then((user) => {
        setUser(user);
        getAlbumsByArtist(userUId)
          .then((albums) => {
            setAlbums(albums.data);
          })
          .catch((e) => {
            throw e;
          });
      })
      .catch((e) => {
        throw e;
      });
  }, []);

  if (user.role === "Artist" && albums.length > 0) {
    return (
      <AllAlbums
        userUId={userUId}
        token={token}
        navigation={navigation}
        albums={albums}
        setAlbum={(album) => {
          goToScreenAlbumView(setData, setCurrentScreen, album);
        }}
      />
    );
  }
  return null;
}
