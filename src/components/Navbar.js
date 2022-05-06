import React, { useState } from "react";
import {
  NavBar,
  NavLinks,
  NavLink,
  Logo,
  MenuButton,
} from "./Navbar.style";
import { PrivateLink,PublicLink,CloseButton } from '../PrivateLink'
import logoImg from "../img/omnia_logo.png";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
  
    return (
      <NavBar>
        <Logo src={logoImg}></Logo>
        <NavLinks openMenu={openMenu}>    
            <NavLink to="/"> Home</NavLink>
            <PrivateLink to="/Admin">Admin</PrivateLink>
            <PrivateLink to="/Profiili">Profiili</PrivateLink>
            <CloseButton/>
            <PublicLink to="/Login">Login</PublicLink>
        </NavLinks>
        <MenuButton onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <>&#10005;</> : <>&#8801;</>}
        </MenuButton>
      </NavBar>
    );
  }
  
export default Navbar;