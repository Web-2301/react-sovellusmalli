import React, { useState } from "react"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Profiili from "./pages/Profiili";
import Todolist from "./pages/Todolist";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Confirm from './pages/Confirm';
import Confirmed from './pages/Confirmed';
import Unconfirmed from './pages/Unconfirmed';
import { AuthContext } from "./context/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Private from './components/PrivateRoute';
import { consoleSivu, closeFetch } from "./connections/yhteydet"
// import logoImg from "./img/omnia_logo.png";
// import axios from "axios";

//const closeUrl = 'http://localhost:5000/reactapi/logout'
function App(props) {
  //const existingTokens = JSON.parse(localStorage.getItem("tokens") || '');
  //const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens") || ''));
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  const [authConfirm, setAuthConfirm] = useState(localStorage.getItem('confirm'));
  console.log('rendering App')
  consoleSivu()

  /* Tyhjennetään state poistuttessa */
  let navigate = useNavigate()
 
  const setTokens = data => {
  console.log('setTokens:',data)
    /* Huom. logout kutsuu setTokens-funktiota ilman dataa,
       jolloin authTokens-alkuarvoksi tulisi merkkijono 'undefined'. 
       Tässä removeItem tuottaa authTokens-alkuarvoksi null,
       jolloin sen boolean arvo on oikein false. */
    if (data) sessionStorage.setItem("tokens", JSON.stringify(data));
    else {
      //axios.get(closeUrl,{withCredentials:true});
      //fetch(closeUrl,{credentials:'include'})
      closeFetch();
      sessionStorage.removeItem("tokens");
      /* 
      Pyritää estetään kirjautuminen samalle sivulle, jolta poistuttiin
      tyhjentämällä react-router-domin useLocation state. Samoin
      myös Kirjaudu-painikkeen yhteydessä. 
      */  
      navigate('/',{})  
      }   
    setAuthTokens(data);
    }

    const setConfirm = data => {
      console.log('setConfirm:',data)
        if (data) localStorage.setItem("confirm", JSON.stringify(data));
        else {
          localStorage.removeItem("confirm");
          }
        setAuthConfirm(data);
        }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens, authConfirm, setAuthConfirm: setConfirm }}>
      {console.log("Provider,authTokens:",authTokens,"authConfirm:",authConfirm)}
      <Navbar/>
      <div className="container">
       <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/testi" element={<Profiili/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/admin" element={<Private><Admin/></Private>}/>
          <Route path="/profiili" element={<Private><Profiili/></Private>}/>
          <Route path="/todolist" element={<Private><Todolist/></Private>}/>
          <Route path="/confirmed" element={<Confirmed/>}/>
          <Route path="/confirm" element={<Private><Confirm/></Private>}/>
          <Route path="/unconfirmed" element={<Private><Unconfirmed/></Private>}/>
        </Routes>
      </div>
      <Footer/>
      </AuthContext.Provider>
  );
}

export default App;