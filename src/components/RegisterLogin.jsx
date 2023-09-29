import { useContext, useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../firebase";
import '../style/App.css'
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import AuthContext from '../context/AuthContext'


function RegisterLogin() {

    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate()
    const [userLoggedIn, setuserLoggedIn] = useState({})

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setuserLoggedIn(currentUser);
            if (currentUser) {
                alert('YOU ARE LOGGED IN --> Login page');
                setTimeout(() => {
                    navigate('/');
                }, 500); // Attendre 500 ms (0,5 seconde) avant de naviguer vers '/Home'
            }
        });

        // Nettoyez le souscripteur lorsque le composant est démonté
        return () => unsubscribe();
    }, [navigate]);


    const register = async () => {
        try {
            const registerMail = document.getElementById("registerMailId").value;
            const registerPswd = document.getElementById("registerPswdId").value;
            const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
            window.location.reload(); // Rafraîchit la page actuelle
            // console.log(user)
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
            dispatch({ type: "LOGIN", payload: user })
            console.log(user)
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

            <Container fluid className="d-flex justify-content-center align-items-center h-100">
                <Row>
                    <Col md={12} className="  RegisterLogin">
                        <Form>
                            <div id="formContainer">
                                <div className='Register'>
                                    <h3>Register User</h3>
                                    <Form.Group controlId="registerMailId">
                                        <Form.Control type="email" placeholder="Email..." />
                                    </Form.Group>
                                    <Form.Group controlId="registerPswdId">
                                        <Form.Control type="password" placeholder="Password..." />
                                    </Form.Group>
                                    <div className='divButton d-flex flex-column my-5'>
                                        <Button onClick={register} variant="primary">Create User</Button>
                                    </div>
                                </div>
                                <div className='Login my-5'>
                                    <h3>Login</h3>
                                    <Form.Group controlId="loginMailId">
                                        <Form.Control type="email" placeholder="Email..." />
                                    </Form.Group>
                                    <Form.Group controlId="loginPswdId">
                                        <Form.Control type="password" placeholder="Password..." />
                                    </Form.Group>
                                    <div className='divButton d-flex flex-column my-5'>
                                        <Button onClick={login} variant="primary">Login</Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <button onClick={logout}> Sign Out </button>

            </Container>
        </>

    );
}


export default RegisterLogin;







// VIDEO MINUTE 18:58

// si j ajoute une 3e page, je serai automoatiquemtn logged in?

// process.env ne fonctionne pas