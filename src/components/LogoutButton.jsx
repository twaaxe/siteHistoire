import { useContext } from "react";
import AuthContext from '../context/AuthContext'
import { signOut } from "firebase/auth";

export default function LogoutButton() {
    const { dispatch } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            // await signOut(auth); // Assurez-vous d'importer et de configurer "auth" correctement
            dispatch({ type: "LOGOUT" });
            localStorage.setItem("user", "null");
            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la déconnexion : ", error);
        }
    };

    return (
        <button className="custom-file-upload" onClick={handleLogout}>Déconnexion</button>
    );
}

