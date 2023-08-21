import React from "react";
import { Link } from 'react-router-dom'
import '../style/Header.css'

import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
        <>
            <Nav className="Header justify-content-center my-3 fw-bolder fs-2">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/registerLogin">Register / Login</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    );
}
// export default function Header() {

//     return (
//         <>
//             <nav className="header">
//                 <Link to="/home">
//                     <div className="">
//                         <span>Home</span>
//                     </div>
//                 </Link>

//                 <Link to="registerLogin" className="">
//                     <div className="">
//                         <span className="">register/ login page</span>
//                     </div>
//                 </Link>
//             </nav >

//         </>
//     )

// }