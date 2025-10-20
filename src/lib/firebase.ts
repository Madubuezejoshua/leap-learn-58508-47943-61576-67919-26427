import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYWepsPqwHfVm4_wRbaanL3mv1t0FWdp0",
  authDomain: "leap-study.firebaseapp.com",
  projectId: "leap-study",
  storageBucket: "leap-study.firebasestorage.app",
  messagingSenderId: "104156370775",
  appId: "1:104156370775:web:6269256654ebc0f59f9012",
  measurementId: "G-CRTM03F4Y3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
