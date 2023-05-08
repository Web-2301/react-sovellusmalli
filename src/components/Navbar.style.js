import { Link } from "react-router-dom";
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
  align-items: center;
  padding: 0 150px;
  margin: 40px 0 20px 0;
  @media (min-width: 700px) {
    flex-direction: row;
    display: flex;
    margin: 20px 0;
  }
`;

export const NavLink = styled(Link)`
color: white;
font-size: x-large; 
text-decoration: none;
font-family: Arial, Helvetica, sans-serif;
margin: 5px 10px;
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
