import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from './pages/Home'
import RegisterLogin from './pages/RegisterLogin'
import Justpage from "./pages/Justpage";

import Header from "./components/Header";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/AuthContext'
import { useContext } from "react";



function App() {

  const { currentUser } = useContext(AuthContext) // recupere le dispatch

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/RegisterLogin" />
  }
  // console.log("from app.jsx " + currentUser.email)


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RequireAuth> <Home /> </RequireAuth>} />
        <Route path="RegisterLogin" element={<RegisterLogin />} />
        <Route path="Justpage" element={<RequireAuth> <Justpage />  </RequireAuth>} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
