// CustomersSay.js
import React from "react";

function CustomersSay() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      review:
        "The Greek salad was absolutely delicious! Fresh ingredients and perfect seasoning. Will definitely come back!",
      image: "/images/customer1.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      review:
        "Amazing Mediterranean flavors! The bruschetta was incredible and the atmosphere is so welcoming.",
      image: "/images/customer2.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 4,
      review:
        "Great food and excellent service. The lemon dessert was the perfect ending to our meal.",
      image: "/images/customer3.jpg",
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 5,
      review:
        "Little Lemon has become our favorite restaurant. The quality and taste are consistently outstanding.",
      image: "/images/customer4.jpg",
    },
  ];

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <div className="testimonial-content">
                <div className="testimonial-image">
                  <img src={testimonial.image} alt={testimonial.name} />
                </div>
                <div className="testimonial-text">
                  <h4>{testimonial.name}</h4>
                  <p>"{testimonial.review}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CustomersSay;
