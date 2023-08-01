import React from "react";
import { Link } from 'react-router-dom'
import '../style/Header.css'

import Nav from 'react-bootstrap/Nav';

export default function Header() {
    return (
        <>
            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link hfre="registerLogin">Register / Login</Nav.Link>
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