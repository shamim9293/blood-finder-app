import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSRMMzuLR2QKY8Hgf6QElk80YZTJ7wCuQ",
  authDomain: "blood-finder-live.firebaseapp.com",
  databaseURL: "https://blood-finder-live-default-rtdb.firebaseio.com",
  projectId: "blood-finder-live",
  storageBucket: "blood-finder-live.firebasestorage.app",
  messagingSenderId: "651346800421",
  appId: "1:651346800421:web:0b1daaac499d08636534cc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);