// Nav.js
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className="container">
        <ul role="menubar">
          <li role="none">
            <Link to="/" role="menuitem" aria-label="Go to home page">
              Home
            </Link>
          </li>
          <li role="none">
            <Link to="/menu" role="menuitem" aria-label="View our menu">
              Menu
            </Link>
          </li>
          <li role="none">
            <Link to="/booking" role="menuitem" aria-label="Make a reservation">
              Reservations
            </Link>
          </li>
          <li role="none">
            <Link
              to="/about"
              role="menuitem"
              aria-label="Learn about Little Lemon"
            >
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
