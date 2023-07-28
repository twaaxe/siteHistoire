import React from "react";
import { Link } from 'react-router-dom'
import '../style/Header.css'


export default function Header() {

    return (

        <>
            <nav className="header">

                <Link to="/home">
                    <div className="">
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