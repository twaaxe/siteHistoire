// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


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
export const storage = getStorage(app)

export const auth = getAuth(app) //this app will have uthentification




// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth'
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//     apiKey: "AIzaSyDY7o66Bm_8XR73AzjnDCUolsTjipd0w5U",
//     authDomain: "react-music-app-5ca31.firebaseapp.com",
//     projectId: "react-music-app-5ca31",
//     storageBucket: "react-music-app-5ca31.appspot.com",
//     messagingSenderId: "501960028085",
//     appId: "1:501960028085:web:60c3f3e2c058a099d573fc"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app)
// export const auth = getAuth(app) //this app will have uthentification