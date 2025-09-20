// Main.js
import React from "react";

function Main() {
  return (
    <main>
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Little Lemon</h1>
            <p className="hero-subtitle">
              A family-owned Mediterranean restaurant offering authentic
              flavors, fresh ingredients, and exceptional dining experiences.
            </p>
            <button className="cta-button">Reserve a Table</button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2>Why Choose Little Lemon?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Fresh Ingredients</h3>
              <p>
                We source the finest Mediterranean ingredients to bring you
                authentic flavors.
              </p>
            </div>
            <div className="feature-card">
              <h3>Family Recipes</h3>
              <p>
                Traditional recipes passed down through generations, prepared
                with love.
              </p>
            </div>
            <div className="feature-card">
              <h3>Warm Atmosphere</h3>
              <p>
                Experience the cozy, welcoming environment that makes every
                visit special.
              </p>
            </div>
          </div>
        </section>

        {/* Menu Preview Section */}
        <section className="menu-preview">
          <h2>Our Specialties</h2>
          <div className="menu-grid">
            <div className="menu-item">
              <h3>Greek Salad</h3>
              <p>
                Fresh tomatoes, cucumbers, olives, and feta cheese with our
                house dressing.
              </p>
            </div>
            <div className="menu-item">
              <h3>Mediterranean Pasta</h3>
              <p>
                Handmade pasta with sun-dried tomatoes, artichokes, and fresh
                herbs.
              </p>
            </div>
            <div className="menu-item">
              <h3>Grilled Fish</h3>
              <p>
                Fresh catch of the day, grilled to perfection with lemon and
                herbs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;
