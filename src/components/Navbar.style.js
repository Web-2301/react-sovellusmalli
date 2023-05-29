import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavBar = styled.nav`
  width: 100%;
  min-height: 70px;
  height: auto;
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  border-bottom: 1px solid #3f4eae;
  display: flex;
  margin-bottom: 10px;
 `;

export const NavLinks = styled.div`
  display: ${(props) => (props.openMenu ? "flex" : "none")};
  width: 100%; 
  flex-direction: column;
  padding: 0 125px;
  margin: 40px 0 20px 0;
  @media (min-width: 700px) {
    flex-direction: row;
    display: flex;
    margin: 20px 0;
  }
`;

export const NavItem = styled(NavLink)`
color: white;
font-size: x-large; 
text-decoration: none;
font-family: Arial, Helvetica, sans-serif;
margin-right: 15px;
white-space:nowrap;
&.active {
  color: #ccc;
}
`;

export const Logo = styled.img`
  margin: 0 0 40px 10px;
  height: 80px;
  position: absolute;
  left: 10px;
`;

export const MenuButton = styled.button`
  width: 70px;
  height: 70px;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  position: absolute;
  right: 0;
  @media (min-width: 700px) {
    display: none;
  }
`;

export const Button = styled.button`
  margin-top:10px;
  min-width:100px;
  @media (min-width: 700px) {
    margin-top:0;
    margin-right:20px;
    position:absolute;
    right:0;
  }
`;

/*
import { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;
const NavLogo = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
`;
const NavMenu = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: absolute;
  top: 4rem;
  left: 0;
  width: 100%;
  background-color: #333;
`;
const NavItem = styled(NavLink)`
  display: block;
  padding: 0.5rem;
  text-decoration: none;
  color: #fff;
  border-top: 1px solid #fff;
  &:first-child {
    border-top: none;
  }
  &.active {
    background-color: #666;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  @media (min-width: 768px) {
    display: none;
  }
`;
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Nav>
      <NavLogo to="/">MyLogo</NavLogo>
      <NavButton onClick={toggleMenu}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </NavButton>
      <NavMenu isOpen={isOpen}>
        <NavItem exact to="/" activeclassname="active">
          Home
        </NavItem>
        <NavItem to="/about" activeclassname="active">
          About
        </NavItem>
        <NavItem to="/services" activeclassname="active">
          Services
        </NavItem>
        <NavItem to="/contact" activeclassname="active">
          Contact
        </NavItem>
      </NavMenu>
    </Nav>
  );
};
export default Navbar;



*/