import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home'
import RegisterLogin from './components/RegisterLogin'
// import user from './components/RegisterLogin'


function App() {

  const isLoggedIn = () => {
    // if (user) {
    //   return true;
    // }
    return true;
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="home" element={<Home />} /> */}
        {/* <Route path="/" element={<RegisterLogin />} /> */}
        <Route exact path="/" render={() => isLoggedIn() ? <Home /> : <RegisterLogin />} />


      </Routes>
    </BrowserRouter>

  );
}

export default App;
