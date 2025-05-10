
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgRl-z58NjOB3IZUsi0_FR6guYiSYSPQg",
  authDomain: "sudevi-agro-foods.firebaseapp.com",
  projectId: "sudevi-agro-foods",
  storageBucket: "sudevi-agro-foods.firebasestorage.app",
  messagingSenderId: "878286597502",
  appId: "1:878286597502:web:699fc33028369b1048972f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
