// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfkl4N69z1x2pg5_kyOsMM2RG26h-UHj0",
  authDomain: "online-movie-watching-platform.firebaseapp.com",
  projectId: "online-movie-watching-platform",
  storageBucket: "online-movie-watching-platform.firebasestorage.app",
  messagingSenderId: "658534988476",
  appId: "1:658534988476:web:7fe18d8c4cb46318daeeb9",
  measurementId: "G-2N2NSCZF4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);