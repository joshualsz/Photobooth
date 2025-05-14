// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARGS50FtQhL1CZaJf5M9PZA3f7yzVZmyY",
  authDomain: "photobooth-5211c.firebaseapp.com",
  projectId: "photobooth-5211c",
  storageBucket: "photobooth-5211c.firebasestorage.app",
  messagingSenderId: "436583981728",
  appId: "1:436583981728:web:16561837e200601fab9fc5",
  measurementId: "G-2FHWWXC5S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;