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
