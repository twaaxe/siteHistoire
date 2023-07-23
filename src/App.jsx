import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "./firebase";

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import RegisterLogin from './components/RegisterLogin'


function App() {


  // // const [registerMail, setregisterMail] = useState("");
  // // const [registerPswd, setregisterPswd] = useState("");
  // const [loginMail, setloginMail] = useState("");
  // const [loginPswd, setloginPswd] = useState("");

  // const [userLoggedIn, setuserLoggedIn] = useState({})

  // onAuthStateChanged(auth, (currentUser) => {
  //   setuserLoggedIn(currentUser)
  // })


  // const register = async () => {
  //   try {
  //     const registerMail = document.getElementById("registerMailId").value;
  //     const registerPswd = document.getElementById("registerPswdId").value;
  //     const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
  //     console.log(user)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  // const login = async () => {
  //   try {
  //     const loginMail = document.getElementById("loginMailId").value;
  //     const loginPswd = document.getElementById("loginPswdId").value;
  //     const user = await signInWithEmailAndPassword(auth, loginMail, loginPswd); //create a user and log him in
  //     console.log(user) //contain objet? all info about user 
  //   } catch (error) {
  //     console.log(error.message)
  //   }

  // }

  // const logout = async () => {
  //   await signOut(auth)

  // }

  // const isLoggedIn = () => {
  //   if (user) {
  //     return true;
  //   }
  // }



  return (
    <BrowserRouter>
      <Routes>
        <Route path="home" element={Home} />
        <Route path="/" element={RegisterLogin} />


      </Routes>


      <h1>ouhiu</h1>
    </BrowserRouter>

  );
}

export default App;
