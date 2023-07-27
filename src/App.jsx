import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import Header from "./components/Header";

// import RegisterLogin from './components/RegisterLogin'
// import user from './components/RegisterLogin'




function RegisterLogin() {

  const [userLoggedIn, setuserLoggedIn] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setuserLoggedIn(currentUser)
  })


  const register = async () => {
    try {
      const registerMail = document.getElementById("registerMailId").value;
      const registerPswd = document.getElementById("registerPswdId").value;
      const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
      return user;
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }


  const login = async () => {
    try {
      const loginMail = document.getElementById("loginMailId").value;
      const loginPswd = document.getElementById("loginPswdId").value;
      const user = await signInWithEmailAndPassword(auth, loginMail, loginPswd); // log him in
      console.log(user) //contain objet? all info about user 
      return user;
    } catch (error) {
      console.log(error.message)
    }


  }

  const logout = async () => {
    await signOut(auth)

  }

  return (
    <>

      <div className="RegisterLogin">
        <div>
          <h3> Register User </h3>
          <input id="registerMailId"
            placeholder="Email..."
          />

          <input id="registerPswdId"
            placeholder="Password..."
          />

          <button onClick={register}> Create User</button>
        </div>

        <div>
          <h3> Login </h3>
          <input id="loginMailId"
            placeholder="Email..."
          />
          <input id="loginPswdId"
            placeholder="Password..."
          />

          <button onClick={login}> Login</button>
        </div>

        <h4> User Logged In: </h4>
        {userLoggedIn?.email}
        <br />

        <button onClick={logout}> Sign Out </button>
      </div>
    </>

  );
}

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="RegisterLogin" element={<RegisterLogin />} />

        {/* <Route exact path="/" render={() => userLoggedIn ? <Home /> : <RegisterLogin />} /> */}











      </Routes>
    </BrowserRouter>

  );
}

export default App;
