import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDPDzbMgZRb2AitUeX8G1R9HWjDYwz4uuI",
  authDomain: "e-commerce-9f260.firebaseapp.com",
  projectId: "e-commerce-9f260",
  storageBucket: "e-commerce-9f260.appspot.com",
  messagingSenderId: "53322475615",
  appId: "1:53322475615:web:99c2c097b30100671453ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
  sendEmailVerification,
  db,
};
