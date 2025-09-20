// BookingForm.js
import React, { useState, useEffect, useCallback } from "react";
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

  // State for form validation
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Initialize available times on component mount
  useEffect(() => {
    const times = initializeTimes();
    setAvailableTimes(times);
  }, []);

  // Validation functions
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "resDate":
        if (!value) {
          error = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (selectedDate < today) {
            error = "Date cannot be in the past";
          }
        }
        break;

      case "resTime":
        if (!value) {
          error = "Time is required";
        }
        break;

      case "guests":
        if (!value) {
          error = "Number of guests is required";
        } else {
          const numGuests = parseInt(value);
          if (isNaN(numGuests) || numGuests < 1) {
            error = "Must be at least 1 guest";
          } else if (numGuests > 10) {
            error = "Maximum 10 guests allowed";
          }
        }
        break;

      case "occasion":
        // Occasion is optional, no validation needed
        break;

      default:
        break;
    }

    return error;
  };

  // Validate entire form
  const validateForm = useCallback((data) => {
    const newErrors = {};
    let formValid = true;

    Object.keys(data).forEach((key) => {
      const error = validateField(key, data[key]);
      if (error) {
        newErrors[key] = error;
        formValid = false;
      }
    });

    setErrors(newErrors);
    setIsValid(formValid);
    return formValid;
  }, []);

  // Check if form is valid only when user has interacted with fields
  useEffect(() => {
    if (Object.keys(touchedFields).length > 0) {
      validateForm(formData);
    }
  }, [formData, validateForm, touchedFields]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(newFormData);

    // Mark field as touched
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    // If date is changed, update available times
    if (name === "resDate" && value) {
      const times = updateTimes(availableTimes, {
        type: "UPDATE_TIMES",
        payload: { date: value },
      });
      setAvailableTimes(times);
      // Reset time selection when date changes
      newFormData.resTime = "";
      setFormData(newFormData);
    }
  };

  // Handle field blur (when user leaves a field)
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Mark all fields as touched when user tries to submit
    const allFieldsTouched = {
      resDate: true,
      resTime: true,
      guests: true,
      occasion: true,
    };
    setTouchedFields(allFieldsTouched);

    // Validate form before submission
    if (!validateForm(formData)) {
      console.log("Form validation failed:", errors);
      return;
    }

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
        setErrors({});
        setIsValid(false);
        setTouchedFields({});

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
      setErrors({});
      setIsValid(false);
      setTouchedFields({});
    }
  };

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      aria-labelledby="booking-form-title"
    >
      <h2 id="booking-form-title" className="visually-hidden">
        Reservation Form
      </h2>
      <div className="form-group">
        <label htmlFor="res-date">Choose date *</label>
        <input
          type="date"
          id="res-date"
          name="resDate"
          value={formData.resDate}
          onChange={handleChange}
          onBlur={handleBlur}
          min={new Date().toISOString().split("T")[0]}
          required
          className={errors.resDate && touchedFields.resDate ? "error" : ""}
          aria-describedby={
            errors.resDate && touchedFields.resDate
              ? "res-date-error"
              : undefined
          }
          aria-invalid={!!(errors.resDate && touchedFields.resDate)}
        />
        {errors.resDate && touchedFields.resDate && (
          <span
            id="res-date-error"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {errors.resDate}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="res-time">Choose time *</label>
        <select
          id="res-time"
          name="resTime"
          value={formData.resTime}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={errors.resTime && touchedFields.resTime ? "error" : ""}
          aria-describedby={
            errors.resTime && touchedFields.resTime
              ? "res-time-error"
              : undefined
          }
          aria-invalid={!!(errors.resTime && touchedFields.resTime)}
        >
          <option value="">Select a time</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.resTime && touchedFields.resTime && (
          <span
            id="res-time-error"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {errors.resTime}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="guests">Number of guests *</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className={errors.guests && touchedFields.guests ? "error" : ""}
          aria-describedby={
            errors.guests && touchedFields.guests ? "guests-error" : undefined
          }
          aria-invalid={!!(errors.guests && touchedFields.guests)}
        />
        {errors.guests && touchedFields.guests && (
          <span
            id="guests-error"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {errors.guests}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="">Select occasion (optional)</option>
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business</option>
          <option value="celebration">Celebration</option>
          <option value="date">Date Night</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        type="submit"
        className="submit-button"
        disabled={!isValid}
        aria-label="On Click"
      >
        {isValid ? "Make Your Reservation" : "Please fill all required fields"}
      </button>
    </form>
  );
}

export default BookingForm;
