// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3X551DCnI_7uzEHjfYvzKwzU3WYXGt7o",
  authDomain: "estacionamento-43503.firebaseapp.com",
  projectId: "estacionamento-43503",
  storageBucket: "estacionamento-43503.appspot.com",
  messagingSenderId: "930819475345",
  appId: "1:930819475345:web:24b4af5484e5c5211dbc30",
  measurementId: "G-0QKRMB2S75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
