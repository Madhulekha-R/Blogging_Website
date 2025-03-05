import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { Await } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyC8n4kxg2w-VixGSV5bp6F6g_M8o3WKvWE",
  authDomain: "blogging-website-searcio.firebaseapp.com",
  projectId: "blogging-website-searcio",
  storageBucket: "blogging-website-searcio.firebasestorage.app",
  messagingSenderId: "222296260284",
  appId: "1:222296260284:web:672273c6359cfe56251ab9"
};

const app = initializeApp(firebaseConfig);

// Google Authentication

const provider = new GoogleAuthProvider()

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user;

}