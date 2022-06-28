import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkXlMSnFVpX6__jBow7AsVoN41Wz9LiIs",
  authDomain: "fiubify.firebaseapp.com",
  projectId: "fiubify",
  storageBucket: "fiubify.appspot.com",
  messagingSenderId: "437257657611",
  appId: "1:437257657611:web:605e09c7c28aecbca5560e",
  databaseURL: "https://fiubify-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getStorage(app);

export const database = getDatabase(app);
