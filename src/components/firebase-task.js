import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

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
const db = getDatabase(app);

export { db };
