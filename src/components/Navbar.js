import React, { useState } from "react";
import {
  NavBar,NavLinks,NavItem as NavLink,
  Logo,MenuButton,} from "./Navbar.style";
import { FaBars,FaTimes } from "react-icons/fa"
import { PrivateLink,PublicLink,LoginCloseButton } from './PrivateLink'
import logoImg from "../img/omnia_logo.png";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
    console.log("rendering Navbar")

    return (
      <NavBar>
        <Logo src={logoImg}></Logo>
        <NavLinks openMenu={openMenu}>    
            <NavLink to="/" activeclassname="active">Home</NavLink>
            {/* Kirjautumattoman käyttäjän testaaminen */}
            <PublicLink to="/Testi" activeclassname="active">Profiili kirjautumatta</PublicLink>
            <PrivateLink to="/Admin" activeclassname="active">Admin</PrivateLink>
            <PrivateLink to="/Profiili" activeclassname="active">Profiili</PrivateLink>
            <PrivateLink to="/Todolist" activeclassname="active">Todolist</PrivateLink>      
            <LoginCloseButton/>
         </NavLinks>
        {/*<MenuButton onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <>&#10005;</> : <>&#8801;</>}
        </MenuButton>*/}
      <MenuButton onClick={() => setOpenMenu(!openMenu)}>
      {openMenu ? <FaTimes/> : <FaBars/>}
      </MenuButton>
      </NavBar>
    );
  }
  
export default Navbar;