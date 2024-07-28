import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc ,getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBubWYb40n-2cIv1TPNPLjSW1mRmfFo4uM",
  authDomain: "taskform-8c494.firebaseapp.com",
  databaseURL: "https://taskform-8c494-default-rtdb.firebaseio.com",
  projectId: "taskform-8c494",
  storageBucket: "taskform-8c494.appspot.com",
  messagingSenderId: "544113440895",
  appId: "1:544113440895:web:ff116c0ad3c4766338274a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc ,getAuth,getFirestore,getDoc};
