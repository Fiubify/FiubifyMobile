import Profile from "./profile/Profile";
export default function MainScreen({ uid }) {
  return <Profile userId={uid}></Profile>;
}
