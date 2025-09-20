// Main.js
import React from "react";

function Main() {
  return (
    <main role="main">
      <div className="container">
        {/* Hero Section */}
        <section className="hero-section" aria-labelledby="main-hero-title">
          <div className="hero-content">
            <h1 id="main-hero-title">Welcome to Little Lemon</h1>
            <p className="hero-subtitle">
              A family-owned Mediterranean restaurant offering authentic
              flavors, fresh ingredients, and exceptional dining experiences.
            </p>
            <button className="cta-button" aria-label="On Click">
              Reserve a Table
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" aria-labelledby="features-title">
          <h2 id="features-title">Why Choose Little Lemon?</h2>
          <div
            className="features-grid"
            role="list"
            aria-label="Restaurant features"
          >
            <article className="feature-card" role="listitem">
              <h3>Fresh Ingredients</h3>
              <p>
                We source the finest Mediterranean ingredients to bring you
                authentic flavors.
              </p>
            </article>
            <article className="feature-card" role="listitem">
              <h3>Family Recipes</h3>
              <p>
                Traditional recipes passed down through generations, prepared
                with love.
              </p>
            </article>
            <article className="feature-card" role="listitem">
              <h3>Warm Atmosphere</h3>
              <p>
                Experience the cozy, welcoming environment that makes every
                visit special.
              </p>
            </article>
          </div>
        </section>

        {/* Menu Preview Section */}
        <section className="menu-preview" aria-labelledby="menu-title">
          <h2 id="menu-title">Our Specialties</h2>
          <div
            className="menu-grid"
            role="list"
            aria-label="Featured menu items"
          >
            <article className="menu-item" role="listitem">
              <h3>Greek Salad</h3>
              <p>
                Fresh tomatoes, cucumbers, olives, and feta cheese with our
                house dressing.
              </p>
            </article>
            <article className="menu-item" role="listitem">
              <h3>Mediterranean Pasta</h3>
              <p>
                Handmade pasta with sun-dried tomatoes, artichokes, and fresh
                herbs.
              </p>
            </article>
            <article className="menu-item" role="listitem">
              <h3>Grilled Fish</h3>
              <p>
                Fresh catch of the day, grilled to perfection with lemon and
                herbs.
              </p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;
