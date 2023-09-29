import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from "../firebase";


function Justpage() {

    const logout = async () => {
        await signOut(auth)
        alert("logout done")
        window.location.reload();
    }

    return (
        <div>
            <h1>Just page</h1>
            <button onClick={logout}> Sign Out </button>
            <h1>{}</h1>

        </div>
    )
}

export default Justpage
