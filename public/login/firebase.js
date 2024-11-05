// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth , createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPDzbMgZRb2AitUeX8G1R9HWjDYwz4uuI",
  authDomain: "e-commerce-9f260.firebaseapp.com",
  projectId: "e-commerce-9f260",
  storageBucket: "e-commerce-9f260.firebasestorage.app",
  messagingSenderId: "53322475615",
  appId: "1:53322475615:web:99c2c097b30100671453ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth , createUserWithEmailAndPassword  }