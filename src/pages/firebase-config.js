// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYAXJsRgd1D_BDdj7FcF2tfjN7SPmg-cs",
  authDomain: "stock-46ee0.firebaseapp.com",
  projectId: "stock-46ee0",
  storageBucket: "stock-46ee0.appspot.com",
  messagingSenderId: "617618681765",
  appId: "1:617618681765:web:89e859d90d4e43a7f4024c",
  measurementId: "G-8XPX7QG2TJ"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


export  const db=getFirestore(app)
