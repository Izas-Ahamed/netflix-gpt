// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "netflixgpt-650ee.firebaseapp.com",
  projectId: "netflixgpt-650ee",
  storageBucket: "netflixgpt-650ee.appspot.com",
  messagingSenderId: "209493756807",
  appId: "1:209493756807:web:c47e88a2df070997cca122",
  measurementId: "G-LL8QQZ5FDV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
