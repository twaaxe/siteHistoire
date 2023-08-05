import { useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";
import '../style/App.css'
import { useNavigate } from 'react-router-dom';



function RegisterLogin() {
    const navigate = useNavigate()

    const [userLoggedIn, setuserLoggedIn] = useState({})

    onAuthStateChanged(auth, (currentUser) => {
        setuserLoggedIn(currentUser)
        if (currentUser) {
            navigate('/Home')

        }
    })


    const register = async () => {
        try {
            const registerMail = document.getElementById("registerMailId").value;
            const registerPswd = document.getElementById("registerPswdId").value;
            const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
            window.location.reload(); // Rafraîchit la page actuelle
            console.log(user)
            return user;
        } catch (error) {
            console.log(error.message)
        }
    }


    const login = async () => {
        try {
            const loginMail = document.getElementById("loginMailId").value;
            const loginPswd = document.getElementById("loginPswdId").value;
            const user = await signInWithEmailAndPassword(auth, loginMail, loginPswd); // log him in
            return user;
        } catch (error) {
            console.log(error.message)
        }


    }

    const logout = async () => {
        await signOut(auth)
        window.location.reload();
    }

    return (
        <>

            {/* <div className="RegisterLogin d-flex flex-column ">
                <div className='Register '>
                    <h3> Register User </h3>
                    <input id="registerMailId"
                        placeholder="Email..."
                    />

                    <input id="registerPswdId"
                        placeholder="Password..."
                    />
                    <div className='divButton d-flex flex-column mx-5 '>
                        <button onClick={register}> Create User</button>
                    </div>
                </div>

                <div className='Login'>
                    <h3> Login </h3>
                    <input id="loginMailId"
                        placeholder="Email..."
                    />
                    <input id="loginPswdId"
                        placeholder="Password..."
                    />

                    <div className='divButton d-flex flex-column mx-5'>
                        <button onClick={login}> Login</button>
                    </div>
                </div>
                <br />
                <div className=''>
                    <div>
                        <h4 className='fs-6'> User Logged In: </h4>
                        <span>{userLoggedIn?.email}</span>
                    </div>
                    <div className='divButton d-flex flex-column mx-5'>
                        <button onClick={logout}> Sign Out </button>
                    </div>
                </div>
            </div> */}

            <div>
                <div className="col-md-5 d-flex flex-column RegisterLogin w-25 ">
                    <div className="container" action="" method="" id="formContainer">
                        <div className='Register '>
                            <h3> Register User </h3>

                            <input id="registerMailId"
                                type="email" className="form-control my-2"
                                placeholder="Email..."
                            />

                            <input id="registerPswdId"
                                placeholder="Password..." className='form-control my-2'
                            />
                            <div className='divButton d-flex flex-column my-5 '>
                                <button onClick={register}> Create User</button>
                            </div>
                        </div>

                        <div className='Login'>
                            <h3> Login </h3>
                            <input id="loginMailId" className='form-control my-2'
                                placeholder="Email..."
                            />
                            <input id="loginPswdId" className='form-control my-2'
                                placeholder="Password..."
                            />

                            <div className='divButton d-flex flex-column my-5'>
                                <button onClick={login}> Login</button>
                            </div>
                        </div>

                    </div>

                    <div className=''>
                        <div>
                            <h4 className='fs-6'> User Logged In: </h4>
                            <span>{userLoggedIn?.email}</span>
                        </div>
                        <div className='divButton d-flex flex-column mx-5'>
                            <button onClick={logout}> Sign Out </button>
                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}


export default RegisterLogin;
