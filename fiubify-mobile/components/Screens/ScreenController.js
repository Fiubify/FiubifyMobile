import { useState } from "react";
import Home from "./Home";
import Profile from "../profile/Profile";

function ScreenController({ uid }) {
  const [currentScreen, setCurrentScreen] = useState("HOME");

  if (currentScreen === "HOME") {
    return <Home setCurrentScreen={setCurrentScreen} />;
  } else if (currentScreen === "SEARCH") {
    return;
  } else if (currentScreen === "LIBRARY") {
    return;
  } else if (currentScreen === "PROFILE") {
    return <Profile userUId={uid} setCurrentScreen={setCurrentScreen} />;
  }
}

export default ScreenController;
