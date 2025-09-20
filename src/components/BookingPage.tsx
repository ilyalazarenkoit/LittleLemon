// BookingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm.tsx";

// Extend Window interface to include API functions
declare global {
  interface Window {
    submitAPI?: (formData: any) => boolean;
  }
}

function BookingPage() {
  const navigate = useNavigate();

  // Function to submit form data to API
  const submitForm = (formData) => {
    // Use submitAPI if available
    if (typeof window !== "undefined" && window.submitAPI) {
      const success = window.submitAPI(formData);
      if (success) {
        // Navigate to confirmation page with booking data
        navigate("/confirmed", { state: { bookingData: formData } });
        return true;
      } else {
        alert(
          "Sorry, there was an error submitting your reservation. Please try again."
        );
        return false;
      }
    } else {
      // Fallback if API is not available - still navigate to confirmation
      navigate("/confirmed", { state: { bookingData: formData } });
      return true;
    }
  };
  return (
    <main className="booking-page">
      <div className="container">
        <div className="booking-header">
          <h1>Reserve a Table</h1>
          <p>
            Book your table at Little Lemon for an unforgettable dining
            experience.
          </p>
        </div>

        <div className="booking-content">
          <div className="booking-form-container">
            <BookingForm submitForm={submitForm} />
          </div>

          <div className="booking-info">
            <h3>Restaurant Information</h3>
            <div className="info-item">
              <h4>Address</h4>
              <p>
                123 Mediterranean Street
                <br />
                Chicago, IL 60601
              </p>
            </div>
            <div className="info-item">
              <h4>Phone</h4>
              <p>(312) 555-0123</p>
            </div>
            <div className="info-item">
              <h4>Hours</h4>
              <p>
                Monday - Sunday
                <br />
                5:00 PM - 10:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default BookingPage;
