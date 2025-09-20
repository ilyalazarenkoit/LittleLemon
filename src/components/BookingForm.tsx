// BookingForm.js
import React, { useState, useEffect } from "react";
import { initializeTimes, updateTimes } from "../utils/bookingTimes";

function BookingForm({ submitForm }) {
  // State for form fields
  const [formData, setFormData] = useState({
    resDate: "",
    resTime: "",
    guests: "",
    occasion: "",
  });

  // Available times state
  const [availableTimes, setAvailableTimes] = useState([]);

  // Initialize available times on component mount
  useEffect(() => {
    const times = initializeTimes();
    setAvailableTimes(times);
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If date is changed, update available times
    if (name === "resDate" && value) {
      const times = updateTimes(availableTimes, {
        type: "UPDATE_TIMES",
        payload: { date: value },
      });
      setAvailableTimes(times);
      // Reset time selection when date changes
      setFormData((prev) => ({
        ...prev,
        resTime: "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Use the submitForm function passed as prop
    if (submitForm) {
      const success = submitForm(formData);
      if (success) {
        // Reset form after successful submission
        setFormData({
          resDate: "",
          resTime: "",
          guests: "",
          occasion: "",
        });

        // Reset available times to today's times
        const times = initializeTimes();
        setAvailableTimes(times);
      }
    } else {
      // Fallback if no submitForm function provided
      alert(
        "Thank you for your reservation! We'll contact you soon to confirm."
      );

      // Reset form after submission
      setFormData({
        resDate: "",
        resTime: "",
        guests: "",
        occasion: "",
      });
    }
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          id="res-date"
          name="resDate"
          value={formData.resDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time</label>
        <select
          id="res-time"
          name="resTime"
          value={formData.resTime}
          onChange={handleChange}
          required
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
        >
          <option value="">Select occasion</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business</option>
          <option value="celebration">Celebration</option>
          <option value="date">Date Night</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button type="submit" className="submit-button">
        Make Your Reservation
      </button>
    </form>
  );
}

export default BookingForm;
