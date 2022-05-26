import { db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

export async function downloadSong(songUrl) {
  const dbRef = ref(db, `${songUrl}`);
  const url = await getDownloadURL(dbRef)
  const { sound } = await Audio.Sound.createAsync(
    { uri: url },
  );

  return sound
}

export async function uploadSong(url) {
  const pickerResult = await DocumentPicker.getDocumentAsync()
  const response = await fetch(pickerResult.uri)
  const file = await response.blob()

  const dbRef = ref(db, url)
  return await uploadBytes(dbRef, file)
}

