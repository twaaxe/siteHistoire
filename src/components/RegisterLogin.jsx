import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";



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
            user = await signInWithEmailAndPassword(auth, loginMail, loginPswd); //create a user and log him in
            console.log(user) //contain objet? all info about user 
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


// export default RegisterLogin;
