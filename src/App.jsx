import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import RegisterLogin from './components/RegisterLogin'


function App() {
  
  const isLoggedIn = (user) => {
    if (user) {
      return true;
    }
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="home" element={<Home />} />
        <Route path="/" element={<RegisterLogin />} /> */}
        <Route exact path="/" render={() => isLoggedIn(user) ? <Home /> : <RegisterLogin />} />


      </Routes>


      {/* <h1>ouhiu</h1> */}
    </BrowserRouter>

  );
}

export default App;
