import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import Home from './components/Home'
import RegisterLogin from './components/RegisterLogin'
import Header from "./components/Header";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AuthContext from './context/AuthContext'
import { useContext } from "react";
import Justpage from "./components/Justpage";



function App() {

  const { currentUser } = useContext(AuthContext) // recupere le dispatch

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/RegisterLogin" />
  }


  return (
    <BrowserRouter>
      {console.log("currenUser : " + currentUser)}
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
