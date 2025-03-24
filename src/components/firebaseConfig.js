import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import {
  
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCo78Nqn6sovY7gU5EiScMCQ2S4T-a2ftE",
  authDomain: "example-2ab90.firebaseapp.com",
  projectId: "example-2ab90",
  storageBucket: "example-2ab90.firebasestorage.app",
  messagingSenderId: "929594053531",
  appId: "1:929594053531:web:0435d31ec8468282f6073e",
  measurementId: "G-FDDWJ6S1H7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({   
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


const providerFacebook = new FacebookAuthProvider();

provider.addScope("email");  

const logout = () => signOut(auth);

export {  logout, collection, addDoc, onSnapshot, query, orderBy };
export const signInWithFacebook = () =>signInWithPopup(auth, providerFacebook);
    
 
