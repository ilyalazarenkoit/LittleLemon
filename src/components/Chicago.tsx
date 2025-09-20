// Chicago.js
import React from "react";

function Chicago() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Little Lemon Chicago</h2>
            <h3>Mediterranean Cuisine</h3>
            <p>
              Little Lemon is a charming neighborhood bistro that serves simple
              food and classic cocktails in a lively but casual environment. The
              restaurant features a locally-sourced menu with daily specials.
            </p>
            <p>
              Based in Chicago, Illinois, Little Lemon is owned by two Italian
              brothers, Mario and Adrian, who moved to the United States to
              pursue their shared dream of owning a restaurant.
            </p>
            <p>
              To craft the menu, Mario relies on family recipes and his
              experience as a chef in Italy. Adrian does all the marketing for
              the restaurant and led the effort to expand the menu beyond
              classic Italian to incorporate additional cuisines from the
              Mediterranean region.
            </p>
          </div>
          <div className="about-images">
            <div className="about-image-main">
              <img
                src="/images/restaurant-interior.jpg"
                alt="Restaurant Interior"
              />
            </div>
            <div className="about-image-secondary">
              <img src="/images/chefs-cooking.jpg" alt="Chefs Cooking" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Chicago;
