import React, { forwardRef, useState } from 'react'; 
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import "./Nav.css";
import { useSelector } from 'react-redux';



const Navlink = styled(NavLink)`
display: flex;
align-items: center;
color: grey;
font-weight: 500;
cursor: pointer;
transition: all 1s slide-in;
text-decoration: none;
&:hover {
color: white;
}
&:active{
color: ${({theme}) => "white"};
border-bottom: 2px solid white;}
@media(max-width: 600px){padding-left: 20px;}
`;


const Nav = forwardRef((props, ref) => {

  //const {currentUser} = useSelector((state) => state.user);
  console.log(useSelector((state) => state.user))
   const [currentUser, setCurrentUser] = useState(true);

  
  return (
    <>
    {currentUser ? (
      <div className="navContainer" ref={ref}>
        <Navlink to="/">Dashboard</Navlink>
        <Navlink to="/marketplace">Marketplace</Navlink>
        <Navlink to="/seller">Seller</Navlink>
        <Navlink to="/auth" className="navBtn">Logout</Navlink>
      </div>
    ) : (
      <div className="navContainer" ref={ref}>
        <Navlink to="/">Dashboard</Navlink>
        <Navlink to="/auth">Login</Navlink>
      </div>
    )}
  </>
 
    
  );
});

export default Nav;
