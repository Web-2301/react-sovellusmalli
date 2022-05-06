import React from "react";
import { Link }  from "react-router-dom";
import { useAuth } from "./context/Auth";
import { NavLink } from "./components/Navbar.style";

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

export function CloseButton() {
    const { authTokens,setAuthTokens } = useAuth();
    const logout = () => {
        console.log("Poistu-painike")
        setAuthTokens();
        }
    return (
      authTokens ?   
      <button onClick={logout}>Poistu</button> : ''
    );
  }