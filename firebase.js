// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaHnnbYBAGD-UR3QiuijuTeFU3sVeeev8",
  authDomain: "planto-c222b.firebaseapp.com",
  projectId: "planto-c222b",
  storageBucket: "planto-c222b.firebasestorage.app",
  messagingSenderId: "685447800227",
  appId: "1:685447800227:web:409af35de97c9fe5946616"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {  db,auth };
