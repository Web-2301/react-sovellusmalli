import React, { useState } from "react"
import { Routes, Link, Route } from "react-router-dom";
import Private from './PrivateRoute';
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import { AuthContext } from "./context/Auth";

function App(props) {
  //const existingTokens = JSON.parse(localStorage.getItem("tokens") || '');
  //const [authTokens, setAuthTokens] = useState(JSON.parse(localStorage.getItem("tokens") || ''));
  const [authTokens, setAuthTokens] = useState(sessionStorage.getItem('tokens'));
  
  const setTokens = (data) => {
    console.log('setTokens:',data)
    /* Huom. logout kutsuu setTokens-funktiota ilman dataa,
       jolloin authTokens-alkuarvoksi tulisi merkkijono 'undefined'. 
       Tässä removeItem tuottaa authTokens-alkuarvoksi null,
       jolloin sen boolean arvo on oikein false. */
    if (data) sessionStorage.setItem("tokens", JSON.stringify(data));
    else sessionStorage.removeItem("tokens");
    setAuthTokens(data);
    }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      {console.log("Provider,authTokens:",authTokens)}
      <div>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/admin">Admin Page</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/admin" element={<Private><Admin/></Private>}/>
        </Routes>
      </div>
      </AuthContext.Provider>
  );
}

export default App;