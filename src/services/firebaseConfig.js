import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwFf-jDp5a5jWlCvEeu3t4vXNGJQkeD6g",
  authDomain: "proyectofinal-rodriguez.firebaseapp.com",
  projectId: "proyectofinal-rodriguez",
  storageBucket: "proyectofinal-rodriguez.firebasestorage.app",
  messagingSenderId: "178750010432",
  appId: "1:178750010432:web:1677a82ad2f0adda281ba5",
  measurementId: "G-3K8XQST5K2"
};



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
