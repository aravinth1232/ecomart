import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBqBHfX9RWU3yvkV9T2kUUKFvijJHdYo6g",
  authDomain: "ecomart-cced5.firebaseapp.com",
  projectId: "ecomart-cced5",
  storageBucket: "ecomart-cced5.appspot.com",
  messagingSenderId: "209386207422",
  appId: "1:209386207422:web:2b2bac65de429190ba86ef",
  measurementId: "G-9677V6RTJ9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, auth };