// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyBQJPfsnvt92KEEMWeJrtGlm8Xs6lImbxo",
    authDomain: "sitehistoire-8d520.firebaseapp.com",
    projectId: "sitehistoire-8d520",
    storageBucket: "sitehistoire-8d520.appspot.com",
    messagingSenderId: "914335080911",
    appId: "1:914335080911:web:966a8119e466fa8a42f2ba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app) //this app will have uthentification