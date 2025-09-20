// CallToAction.js
import React from "react";
import { Link } from "react-router-dom";

function CallToAction() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to Little Lemon</h1>
          <p className="hero-subtitle">
            A family-owned Mediterranean restaurant offering authentic flavors,
            fresh ingredients, and exceptional dining experiences.
          </p>
          <Link to="/booking" className="cta-button">
            Reserve a Table
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
