// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeqOb217W_zKQEqcc_YiGupozt-29N0L0",
  authDomain: "pirate-music-video.firebaseapp.com",
  projectId: "pirate-music-video",
  storageBucket: "pirate-music-video.appspot.com",
  messagingSenderId: "717157549489",
  appId: "1:717157549489:web:5c969276fb60901793a990",
  measurementId: "G-N7QVPS06J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);