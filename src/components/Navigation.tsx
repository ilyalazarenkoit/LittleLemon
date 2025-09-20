// Nav.js
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <div className="container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          <li>
            <Link to="/booking">Reservations</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
