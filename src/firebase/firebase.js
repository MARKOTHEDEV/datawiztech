// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCk1OVFJNVP9r3TNF6H9-82ibT8WMTALgc",
  authDomain: "datawiztech-9a46a.firebaseapp.com",
  projectId: "datawiztech-9a46a",
  storageBucket: "datawiztech-9a46a.appspot.com",
  messagingSenderId: "565474565984",
  appId: "1:565474565984:web:73ac9b29c830b433b14805"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Create and export Firestore instance
const db = getFirestore(app);

// Create and export Firebase Auth instance
const auth = getAuth(app);

// Create and export Firebase Storage instance
const storage = getStorage(app);

export { app, db, auth, storage };