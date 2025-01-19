import React, { forwardRef } from 'react'; 
import "./Nav.css";

// Use forwardRef to forward the ref to the root DOM element of the component
const Nav = forwardRef((props, ref) => {
  return (
    <div className="navContainer" ref={ref}>
        <div className="logo">LOGO</div>

        <div className="home">
          Home
        </div>

        <div className="seller">
          Seller
        </div>

        <div className="marketplace">
          MarketPlace
        </div>
        <div className="login">Login</div>
    </div>
  );
});

export default Nav;
