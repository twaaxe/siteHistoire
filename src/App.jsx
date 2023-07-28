import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import RegisterLogin from './components/RegisterLogin'
import Header from "./components/Header";


function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="Home" element={<Home />} />
        <Route path="RegisterLogin" element={<RegisterLogin />} />

        {/* <Route exact path="/" render={() => userLoggedIn ? <Home /> : <RegisterLogin />} /> */}


      </Routes>
    </BrowserRouter>

  );
}

export default App;
