import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAf7W5ReOroxU3kfl1xZ1fJLh6midOe8JA",
  authDomain: "lab6-auth-41802.firebaseapp.com",
  projectId: "lab6-auth-41802",
  storageBucket: "lab6-auth-41802.firebasestorage.app",
  messagingSenderId: "92272747792",
  appId: "1:92272747792:web:de533a10b9fedd3ab17195",
  measurementId: "G-37163NSS3M",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
