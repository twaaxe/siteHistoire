import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from "./firebase";

function App() {


  const [registerMail, setregisterMail] = useState("");
  const [registerPswd, setregisterPswd] = useState("");
  const [loginMail, setloginMail] = useState("");
  const [loginPswd, setloginPswd] = useState("");

  const [userLoggedIn, setuserLoggedIn] = useState({})

  onAuthStateChanged(auth, (currentUser) => {

    setuserLoggedIn(currentUser)

  })


  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
      console.log(user) //contain objet? all info about user 
    } catch (error) {
      console.log(error.message)
    }
  }

  const login = async () => {

  }

  const logout = async () => {
    await signOut(auth)

  }

  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setregisterMail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setregisterPswd(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setloginMail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setloginPswd(event.target.value);
          }}
        />

        <button onClick={login}> Login</button>
      </div>

      <h4> User Logged In: </h4>
      {/* {auth.currentUser ? auth.currentUser.email : ""} */}
      {userLoggedIn?.email}

      <button onClick={logout}> Sign Out </button>
    </div>
  );
}

export default App;
