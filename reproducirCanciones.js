import { db } from "./fiubify-mobile/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';

export function reproducirCancion(nombreDeCancion) {
  const dbRef = ref(db, `songs/${nombreDeCancion}`);
  getDownloadURL(dbRef).then(async (url) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: url },
    );

    await sound.playAsync();
  });
}

export async function subirCancion() {
  const pickerResult = await DocumentPicker.getDocumentAsync()
  const response = await fetch(pickerResult.uri)
  const file = await response.blob()

  const dbRef = ref(db, `songs/${pickerResult.name}`)
  await uploadBytes(dbRef, file)
}

