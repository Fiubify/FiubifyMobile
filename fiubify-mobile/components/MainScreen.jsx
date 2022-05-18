import Profile from "./profile/Profile";
import React from "@types/react";

export default function MainScreen({ uid }) {
  return <Profile userId={uid}></Profile>;
}
