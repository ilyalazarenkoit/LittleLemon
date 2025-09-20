// Footer.js
import React from "react";

function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Little Lemon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
