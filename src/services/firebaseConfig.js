import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfoF4NzDM1zvzYzpwjxPuEhGCVSGDrDsk",
  authDomain: "urbanstyle-13a25.firebaseapp.com",
  projectId: "urbanstyle-13a25",
  storageBucket: "urbanstyle-13a25.appspot.com", // ✅ corregido
  messagingSenderId: "205420167381",
  appId: "1:205420167381:web:fced8e8522bd04961f625c",
  measurementId: "G-777F345ZMP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
