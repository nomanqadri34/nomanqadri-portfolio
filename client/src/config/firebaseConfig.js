import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtq3Jm49bTgh6ElR1857d9tLpX-EH-niE",
  authDomain: "al-qadri-dev.firebaseapp.com",
  projectId: "al-qadri-dev",
  storageBucket: "al-qadri-dev.firebasestorage.app",
  messagingSenderId: "501033838451",
  appId: "1:501033838451:web:4c1942ff062f0f9e300706",
  measurementId: "G-3G90VZ8TYF"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signOut };

