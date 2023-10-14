import React from "react";
import { Link } from 'react-router-dom'
import '../style/Header.css'


import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
        <>
            <Nav className=" header justify-content-center my-3 fw-bolder fs-2">
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/registerLogin">Register / Login</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link href="/AllCollection">All Collection</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}


