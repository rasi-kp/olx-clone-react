import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import "firebase/firestore"


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAXe_wYOzdBRERR7YE6-sNK23Twny1ChbU",
    authDomain: "react-test-8b9c6.firebaseapp.com",
    projectId: "react-test-8b9c6",
    storageBucket: "react-test-8b9c6.appspot.com",
    messagingSenderId: "1063494142656",
    appId: "1:1063494142656:web:df4dffb5b79747880bfb25",
    measurementId: "G-WQNE08VZ9Z"
  };
export const Firebase = initializeApp(firebaseConfig);
//  console.log("testing firebase "+Firebase);
 export const auth = getAuth(Firebase);
 export const firestore=getFirestore(Firebase)
