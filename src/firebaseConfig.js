import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCSRMMzuLR2QKy8Hgf6QElk80YZTJ7wCuQ",
  authDomain: "blood-finder-live.firebaseapp.com",
  databaseURL: "https://blood-finder-live-default-rtdb.firebaseio.com",
  projectId: "blood-finder-live",
  storageBucket: "blood-finder-live.firebasestorage.app",
  messagingSenderId: "651346800421",
  appId: "1:651346800421:web:0b1daaac499d08636534cc",
  measurementId: "G-S96M8Y7BCC"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);