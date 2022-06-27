function checkNavigation(navigation) {
  if (!navigation) throw Error("No se especificó navigation");
}

export function goToScreenAlbumView(setData, setCurrentScreen, album) {
  if (!album) throw Error("No se especificó album");

  setData({ album: album });
  setCurrentScreen("ALBUM-VIEW");
}

export function goToScreenPlaylistView(setData, setCurrentScreen, playlist) {
  if (!playlist) throw Error("No se especifico playlist");
  setData({ playlist });
  setCurrentScreen("PLAYLIST-VIEW");
}

export function goToScreenHome(setCurrentScreen) {
  setCurrentScreen("HOME");
}

export function goToScreenSearch(setCurrentScreen) {
  setCurrentScreen("SEARCH");
}

export function goToScreenMyLibrary(setCurrentScreen) {
  setCurrentScreen("MY-LIBRARY");
}

export function navigateToHome(uid, token, navigation) {
  checkNavigation(navigation);
  if (!uid || !token) throw Error("No se especificó uid o token o navigation");

  navigation.navigate("Home", {
    uid,
    token,
  });
}

export function navigateToEntry(navigation) {
  checkNavigation(navigation);
  navigation.navigate("Entry");
}

export function navigateToForgotPassword(navigation) {
  checkNavigation(navigation);
  navigation.navigate("ForgotPassword");
}

export function navigateToRegistration(navigation) {
  checkNavigation(navigation);
  navigation.navigate("Registration");
}

export function navigateToLogin(navigation) {
  checkNavigation(navigation);
  navigation.navigate("Login");
}

export function navigateToEditPlaylist(uid, token, playlist, navigation) {
  checkNavigation(navigation);
  if (!uid || !token || !playlist)
    throw new Error("No se especifico uid, token o playlist");
  navigation.navigate("PlaylistEdit", {
    uid,
    token,
    playlist,
  });
}

export function navigateToSubscriptionForm(userUId, token, tier, navigation) {
  checkNavigation();
  if (!userUId || !token || !tier)
    throw new Error("No se especifico userUId, token o tier");
  navigation.navigate("SubsciptionForm", {
    userUId,
    token,
    tier,
  });
}

export function navigateToSongForm(userUId, token, navigation) {
  checkNavigation(navigation);
  if (!userUId || !token) throw new Error("No se especifico userUId o token");

  navigation.navigate("SongForm", {
    userUId: userUId,
    token: token,
  });
}

export function navigateToAlbumForm(userUId, token, navigation) {
  checkNavigation(navigation);
  if (!userUId || !token) throw new Error("No se especifico userUId o token");

  navigation.navigate("AlbumForm", {
    userUId: userUId,
    token: token,
  });
}

export function navigateToPlaylistForm(userUId, token, navigation) {
  checkNavigation(navigation);
  if (!userUId || !token) throw new Error("No se especifico userUId o token");

  navigation.navigate("PlaylistForm", {
    userUId: userUId,
    token: token,
  });
}

export function navigateToMyProfile(userUId, token, navigation) {
  checkNavigation(navigation);
  if (!userUId || !token) throw new Error("No se especifico userUId o token");

  navigation.navigate("MyProfile", {
    userUId: userUId,
    token,
  });
}

export function navigateToExternProfile(
  userUId,
  currentUserId,
  token,
  navigation
) {
  checkNavigation(navigation);
  if (!userUId || !token) throw new Error("No se especifico userUId o token");

  navigation.navigate("ExternProfile", {
    userUId: userUId,
    currentUserUId: currentUserId,
    token,
  });
}

export function navigateToMessagesView(userUId, token, name, navigation) {
  checkNavigation(navigation);
  if (!userUId || !token || !name)
    throw new Error("No se especifico userUId, token o name");

  navigation.navigate("MessagesView", {
    userUId: userUId,
    token,
    name,
  });
}
