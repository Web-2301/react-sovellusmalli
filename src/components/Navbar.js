import React, { useState } from "react";
import {
  NavBar,
  NavLinks,
  NavLink,
  Logo,
  MenuButton,
} from "./Navbar.style";

import logoImg from "../img/omnia_logo.png";

function Navbar() {
    const [openMenu, setOpenMenu] = useState(false);
  
    return (
      <NavBar>
        <Logo src={logoImg}></Logo>
        <NavLinks openMenu={openMenu}>    
            <NavLink to="/"> Home</NavLink>
            <NavLink to="/Admin">Admin</NavLink>
            <NavLink to="/Login">Login</NavLink>
        </NavLinks>
        <MenuButton onClick={() => setOpenMenu(!openMenu)}>
        {openMenu ? <>&#10005;</> : <>&#8801;</>}
        </MenuButton>
      </NavBar>
    );
  }
  

export default Navbar;