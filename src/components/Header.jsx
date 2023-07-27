import React from "react";
import { Link } from 'react-router-dom'
// import '../style/Header.css'


export default function Header() {

    return (

        <>
            <nav className="header"
                style={{
                    height: '100px',
                    width: '100vw',
                    backgroundColor: 'red',
                    color: 'white', // Couleur du texte (par exemple blanc ici)
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                <h1>azerty</h1>

                <Link to="/home">
                    <div>
                        <span>Home</span>
                    </div>
                </Link>



                <Link to="registerLogin" className="">
                    <div className="">
                        <span className="">register/ login page</span>
                    </div>
                </Link>
            </nav >

        </>
    )

}