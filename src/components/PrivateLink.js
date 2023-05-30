import React from "react"
import { useNavigate,useLocation  } from "react-router-dom"
import { useAuth } from "../context/Auth"
import { NavItem as NavLink,Button } from "./Navbar.style"

export function PrivateLink({ ...rest }) {
  const { authTokens } = useAuth();
  //console.log("PrivateLink,authTokens:"+authTokens+",sessionStorage:"+sessionStorage.tokens);
  return (
    authTokens ?  
    <NavLink {...rest}/> : ''
  );
}

export function PublicLink({ ...rest }) {
    const { authTokens } = useAuth()
    //console.log("PublicLink,authTokens:"+authTokens+",sessionStorage:"+sessionStorage.tokens);
    return (
      !authTokens ?  
      <NavLink style={{ color:'#aaa' }} {...rest}/> : ''
    );
  }

export function LoginCloseButton() {
    const { authTokens,setAuthTokens } = useAuth()
    let navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
    /* Poistetaan state useLocation-hookista, muuten uudelleen kirjautuminen
       vie sille sivulle, josta poistuttiin. Se ei välttämättä tosin ole
       huono ratkaisu. Tilamuuttujan nollaus palauttaa perusnäkymän.
    */
      console.log("Poistu-painiketta napsautettiin..")
      console.log("LoginCloseButton,pathname:",location.pathname)
      /* Huom. Tämä ei toimi, eli kirjautuu sille sivulle,
         jolta viimeksi poistuttiin.
       */
      //navigate(location.pathname, { replace: true });
      //window.history.replaceState({}, document.title)
      navigate(location.pathname, {});
      setAuthTokens()
      }

    /* Huom. tämä toimii Kirjaudu-painikkeen napsautuksesta */  
    const login = () => navigate('/login',{})
                
    return (
      authTokens ?   
      <Button onClick={logout}>Poistu</Button> : 
      <Button onClick={login}>Kirjaudu</Button>
    )
  }

