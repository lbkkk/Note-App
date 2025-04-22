// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChP5y4_FQ63x3n_6XHw26EakYUBJsw6Aw",
  authDomain: "note-app-9d31b.firebaseapp.com",
  projectId: "note-app-9d31b",
  storageBucket: "note-app-9d31b.firebasestorage.app",
  messagingSenderId: "801869824285",
  appId: "1:801869824285:web:9fd5553d535e8821c4e1f4",
  measurementId: "G-Q1CWB5DJBF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);