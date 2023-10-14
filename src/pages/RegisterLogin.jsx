import { useContext, useState } from 'react'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import AuthContext from '../context/AuthContext'
import { auth } from "../firebase";
import '../style/App.css'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LogoutButton from '../components/LogoutButton';






function RegisterLogin() {

    const { dispatch } = useContext(AuthContext)
    const [userLoggedIn, setuserLoggedIn] = useState({})
    const { currentUser } = useContext(AuthContext) // recupere le dispatch


    const register = async () => {
        try {
            const registerMail = document.getElementById("registerMailId").value;
            const registerPswd = document.getElementById("registerPswdId").value;
            const user = await createUserWithEmailAndPassword(auth, registerMail, registerPswd); //create a user and log him in
            window.location.pathname = "/"
            return user;
        } catch (error) {
            console.log(error.message)
        }
    }


    const login = async () => {
        const loginMail = document.getElementById("loginMailId").value;
        const loginPswd = document.getElementById("loginPswdId").value;
        const user = await signInWithEmailAndPassword(auth, loginMail, loginPswd) // log him in
            .then((userCredential) => {
                // Signed in
                setuserLoggedIn(currentUser);
                alert(userCredential)

                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                window.location.pathname = "/"
            })
            .catch((error) => {
                console.log(error.message)
            })


    }

    const logout = async () => {
        await signOut(auth)
        dispatch({ type: "LOGOUT" });
        window.location.reload();
    }

    return (
        <>

            <Container fluid className=" justify-content-center  mt-5 " style={{ height: "100vh", width: "65%" }}>


                <Row>
                    <div className='Register'>
                        <h3 className='my-3'>Register User</h3>
                        <Form.Group controlId="registerMailId">
                            <Form.Control className='my-3' type="email" placeholder="Email..." />
                        </Form.Group>
                        <Form.Group controlId="registerPswdId">
                            <Form.Control type="password" placeholder="Password..." />
                        </Form.Group>
                        <div className='divButton d-flex flex-column my-5'>
                            <Button onClick={register} variant="primary">Create User</Button>
                        </div>
                    </div>
                </Row>



                <Row>
                    <div className='Login my-3'>
                        <h3 className='my-3'>Login</h3>
                        <Form.Group controlId="loginMailId">
                            <Form.Control className='my-3' type="email" placeholder="Email..." />
                        </Form.Group>
                        <Form.Group controlId="loginPswdId">
                            <Form.Control type="password" placeholder="Password..." />
                        </Form.Group>
                        <div className='divButton d-flex flex-column my-5'>
                            <Button onClick={login} variant="primary">Login</Button>

                        </div>
                    </div>
                </Row>
                <Row className="w-50 mx-auto    justify-content-center">
                    <LogoutButton />
                </Row>


            </Container>
        </>

    );
}


export default RegisterLogin;







// VIDEO MINUTE 18:58

// si j ajoute une 3e page, je serai automoatiquemtn logged in?

// process.env ne fonctionne pas