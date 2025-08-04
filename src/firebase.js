// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5DoqvV80Rq17B0nBxUAaoF6djiQOpVSU",
  authDomain: "causalfunnel-proj.firebaseapp.com",
  projectId: "causalfunnel-proj",
  storageBucket: "causalfunnel-proj.firebasestorage.app",
  messagingSenderId: "85573024627",
  appId: "1:85573024627:web:989731810a69bc32972306",
  measurementId: "G-EP2SELZ6M9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
