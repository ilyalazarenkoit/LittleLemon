// ConfirmedBooking.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ConfirmedBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking data from location state
  const bookingData = location.state?.bookingData || {};

  const handleNewBooking = () => {
    navigate("/booking");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <main className="confirmed-booking-page">
      <div className="container">
        <div className="confirmation-content">
          <div className="confirmation-icon">
            <div className="checkmark">✓</div>
          </div>

          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message">
            Thank you for choosing Little Lemon. Your reservation has been
            successfully confirmed.
          </p>

          <div className="booking-details">
            <h2>Reservation Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <strong>Date:</strong>
                <span>{bookingData.resDate || "Not specified"}</span>
              </div>
              <div className="detail-item">
                <strong>Time:</strong>
                <span>{bookingData.resTime || "Not specified"}</span>
              </div>
              <div className="detail-item">
                <strong>Guests:</strong>
                <span>{bookingData.guests || "Not specified"}</span>
              </div>
              <div className="detail-item">
                <strong>Occasion:</strong>
                <span>{bookingData.occasion || "Not specified"}</span>
              </div>
            </div>
          </div>

          <div className="confirmation-actions">
            <button
              className="action-button primary"
              onClick={handleNewBooking}
            >
              Make Another Reservation
            </button>
            <button className="action-button secondary" onClick={handleHome}>
              Back to Home
            </button>
          </div>

          <div className="restaurant-info">
            <h3>We look forward to serving you!</h3>
            <p>
              If you need to modify or cancel your reservation, please contact
              us at (312) 555-0123
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
