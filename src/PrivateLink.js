import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/Auth";
import { NavLink,Button } from "./components/Navbar.style";

export function PrivateLink({ ...rest }) {
  const { authTokens } = useAuth();
  //console.log("PrivateLink,authTokens:"+authTokens+",sessionStorage:"+sessionStorage.tokens);
  return (
    authTokens ?  
    <NavLink {...rest}/> : ''
  );
}

export function PublicLink({ ...rest }) {
    const { authTokens } = useAuth();
    //console.log("PublicLink,authTokens:"+authTokens+",sessionStorage:"+sessionStorage.tokens);
    return (
      !authTokens ?  
      <NavLink {...rest}/> : ''
    );
  }

export function LoginCloseButton() {
    const { authTokens,setAuthTokens } = useAuth();
    let navigate = useNavigate();
    const logout = () => {
        console.log("Poistu-painike")
        setAuthTokens();
        }
    const login = () => {
        navigate('/login');
        }
               
    return (
      authTokens ?   
      <Button onClick={logout}>Poistu</Button> : 
      <Button onClick={login}>Kirjaudu</Button>
    );
  }

