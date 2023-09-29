import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer"


const INITIAL_STATE = {
    currentUser: JSON.parse(localStorage.getItem("user") || null) // recupere la donne de connexion. s'il n'y a pas; currentUser == null
}

const AuthContext = createContext(INITIAL_STATE);
export default AuthContext;




export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.currentUser)) // store the connexion
    })


    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};





