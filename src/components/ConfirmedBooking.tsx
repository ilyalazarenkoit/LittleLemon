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
    <main className="confirmed-booking-page" role="main">
      <div className="container">
        <div className="confirmation-content">
          <div
            className="confirmation-icon"
            role="img"
            aria-label="Success checkmark"
          >
            <div className="checkmark" aria-hidden="true">
              ✓
            </div>
          </div>

          <h1>Booking Confirmed!</h1>
          <p className="confirmation-message" role="status" aria-live="polite">
            Thank you for choosing Little Lemon. Your reservation has been
            successfully confirmed.
          </p>

          <section className="booking-details" aria-labelledby="details-title">
            <h2 id="details-title">Reservation Details</h2>
            <dl className="details-grid" role="list">
              <div className="detail-item" role="listitem">
                <dt>
                  <strong>Date:</strong>
                </dt>
                <dd>{bookingData.resDate || "Not specified"}</dd>
              </div>
              <div className="detail-item" role="listitem">
                <dt>
                  <strong>Time:</strong>
                </dt>
                <dd>{bookingData.resTime || "Not specified"}</dd>
              </div>
              <div className="detail-item" role="listitem">
                <dt>
                  <strong>Guests:</strong>
                </dt>
                <dd>{bookingData.guests || "Not specified"}</dd>
              </div>
              <div className="detail-item" role="listitem">
                <dt>
                  <strong>Occasion:</strong>
                </dt>
                <dd>{bookingData.occasion || "Not specified"}</dd>
              </div>
            </dl>
          </section>

          <div
            className="confirmation-actions"
            role="group"
            aria-label="Booking actions"
          >
            <button
              className="action-button primary"
              onClick={handleNewBooking}
              aria-label="On Click"
            >
              Make Another Reservation
            </button>
            <button
              className="action-button secondary"
              onClick={handleHome}
              aria-label="On Click"
            >
              Back to Home
            </button>
          </div>

          <div className="restaurant-info">
            <h3>We look forward to serving you!</h3>
            <p>
              If you need to modify or cancel your reservation, please contact
              us at{" "}
              <a href="tel:+13125550123" aria-label="Call us at 312-555-0123">
                (312) 555-0123
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ConfirmedBooking;
