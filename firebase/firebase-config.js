import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyAtG66RjLNvZzBhzKsUwy6xrL1xK9fcf1o",
  authDomain: "recipeapp-52f16.firebaseapp.com",
  databaseURL: "https://recipeapp-52f16-default-rtdb.firebaseio.com",
  projectId: "recipeapp-52f16",
  storageBucket: "recipeapp-52f16.appspot.com",
  messagingSenderId: "824154448914",
  appId: "1:824154448914:web:aadace31bdf89d1c9524cb",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const createUserImage = async (userId, image) => {
  const storage = getStorage(app);
  const reference = ref(storage, "users/" + `${userId}`);

  const img = await fetch(image);
  const bytes = await img.blob();

  await uploadBytes(reference, bytes);

  // Get new firebase image url from cloud store
  const image_url = await getDownloadURL(reference);

  return image_url;
};
