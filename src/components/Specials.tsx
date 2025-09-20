// Specials.js
import React from "react";

function Specials() {
  const specials = [
    {
      id: 1,
      name: "Greek Salad",
      price: "$12.99",
      description:
        "Fresh tomatoes, cucumbers, olives, and feta cheese with our signature house dressing.",
      image: "/images/greek-salad.jpg",
    },
    {
      id: 2,
      name: "Bruschetta",
      price: "$8.99",
      description:
        "Grilled bread rubbed with garlic and topped with olive oil, salt, and fresh tomatoes.",
      image: "/images/bruschetta.jpg",
    },
    {
      id: 3,
      name: "Lemon Dessert",
      price: "$6.99",
      description:
        "Homemade lemon cake with fresh lemon zest and a light lemon glaze.",
      image: "/images/lemon-dessert.jpg",
    },
  ];

  return (
    <section className="specials-section">
      <div className="container">
        <div className="specials-header">
          <h2>This Week's Specials</h2>
          <button className="menu-button">Online Menu</button>
        </div>
        <div className="specials-grid">
          {specials.map((special) => (
            <div key={special.id} className="special-card">
              <div className="special-image">
                <img src={special.image} alt={special.name} />
              </div>
              <div className="special-content">
                <div className="special-header">
                  <h3>{special.name}</h3>
                  <span className="special-price">{special.price}</span>
                </div>
                <p className="special-description">{special.description}</p>
                <button className="order-button">Order a delivery</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Specials;
