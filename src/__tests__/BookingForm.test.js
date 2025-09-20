import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../components/BookingForm.tsx";

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
  value: mockAlert,
  writable: true,
});

// Mock console.log
const mockConsoleLog = jest.fn();
Object.defineProperty(console, "log", {
  value: mockConsoleLog,
  writable: true,
});

// Clear mocks before each test
beforeEach(() => {
  mockAlert.mockClear();
  mockConsoleLog.mockClear();
});

// Test for static text being rendered in the BookingForm component
test("Renders the BookingForm heading", () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Please fill all required fields");
  expect(headingElement).toBeInTheDocument();
});

// Test for form labels
test("Renders all form labels", () => {
  render(<BookingForm />);

  const dateLabel = screen.getByText("Choose date *");
  const timeLabel = screen.getByText("Choose time *");
  const guestsLabel = screen.getByText("Number of guests *");
  const occasionLabel = screen.getByText("Occasion");

  expect(dateLabel).toBeInTheDocument();
  expect(timeLabel).toBeInTheDocument();
  expect(guestsLabel).toBeInTheDocument();
  expect(occasionLabel).toBeInTheDocument();
});

// Test for form inputs
test("Renders all form inputs", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");
  const occasionSelect = screen.getByLabelText("Occasion");

  expect(dateInput).toBeInTheDocument();
  expect(timeSelect).toBeInTheDocument();
  expect(guestsInput).toBeInTheDocument();
  expect(occasionSelect).toBeInTheDocument();
});

// Test for available times options
test("Renders available times options", () => {
  render(<BookingForm />);

  const timeSelect = screen.getByLabelText("Choose time *");
  expect(timeSelect).toBeInTheDocument();

  // Check if time options are rendered
  expect(screen.getByText("17:00")).toBeInTheDocument();
  expect(screen.getByText("18:00")).toBeInTheDocument();
  expect(screen.getByText("19:00")).toBeInTheDocument();
  expect(screen.getByText("20:00")).toBeInTheDocument();
  expect(screen.getByText("21:00")).toBeInTheDocument();
});

// Test form submission
test("Form submission works correctly", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");

  // Fill out the form
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateString = futureDate.toISOString().split("T")[0];

  fireEvent.change(dateInput, { target: { value: futureDateString } });
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });

  // Now get the submit button after form is filled
  const submitButton = screen.getByText("Make Your Reservation");

  // Submit the form
  fireEvent.click(submitButton);

  // Check if form resets after submission
  expect(dateInput.value).toBe("");
  expect(timeSelect.value).toBe("");
  expect(guestsInput.value).toBe("");
});

// Test for form validation with new validation logic
test("Form validation prevents submission with invalid data", () => {
  render(<BookingForm />);

  // Button should be disabled initially
  expect(screen.getByText("Please fill all required fields")).toBeDisabled();
});

// Test for date validation
test("Date validation works correctly", () => {
  render(<BookingForm />);

  // Try to select a past date
  fireEvent.change(screen.getByLabelText(/choose date \*/i), {
    target: { value: "2020-01-01" },
  });

  // Should show error message
  expect(screen.getByText("Date cannot be in the past")).toBeInTheDocument();
});

// Test for guests validation
test("Guests validation works correctly", () => {
  render(<BookingForm />);

  // Try to enter invalid number of guests
  fireEvent.change(screen.getByLabelText(/number of guests \*/i), {
    target: { value: "0" },
  });

  // Should show error message
  expect(screen.getByText("Must be at least 1 guest")).toBeInTheDocument();
});

// Test form validation
test("Form validation works correctly", () => {
  render(<BookingForm />);

  const submitButton = screen.getByText("Please fill all required fields");

  // Try to submit empty form
  fireEvent.click(submitButton);

  // Check if required fields are still empty (form should not submit)
  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");

  expect(dateInput.value).toBe("");
  expect(timeSelect.value).toBe("");
  expect(guestsInput.value).toBe("");
});

// Test HTML5 validation attributes
test("Date input has correct HTML5 validation attributes", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");

  expect(dateInput).toHaveAttribute("type", "date");
  expect(dateInput).toHaveAttribute("required");
  expect(dateInput).toHaveAttribute("min");
  expect(dateInput.getAttribute("min")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test("Time select has correct HTML5 validation attributes", () => {
  render(<BookingForm />);

  const timeSelect = screen.getByLabelText("Choose time *");

  expect(timeSelect).toHaveAttribute("required");
  expect(timeSelect.tagName).toBe("SELECT");
});

test("Guests input has correct HTML5 validation attributes", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  expect(guestsInput).toHaveAttribute("type", "number");
  expect(guestsInput).toHaveAttribute("required");
  expect(guestsInput).toHaveAttribute("min", "1");
  expect(guestsInput).toHaveAttribute("max", "10");
});

test("Occasion select is optional (no required attribute)", () => {
  render(<BookingForm />);

  const occasionSelect = screen.getByLabelText("Occasion");

  expect(occasionSelect).not.toHaveAttribute("required");
  expect(occasionSelect.tagName).toBe("SELECT");
});

// Test JavaScript validation functions - Valid states
test("Form validation passes with valid data", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");

  // Fill with valid data
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateString = futureDate.toISOString().split("T")[0];

  fireEvent.change(dateInput, { target: { value: futureDateString } });
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });

  // Button should be enabled
  expect(screen.getByText("Make Your Reservation")).not.toBeDisabled();

  // No error messages should be visible
  expect(screen.queryByText("Date is required")).not.toBeInTheDocument();
  expect(screen.queryByText("Time is required")).not.toBeInTheDocument();
  expect(
    screen.queryByText("Number of guests is required")
  ).not.toBeInTheDocument();
});

test("Date validation passes with future date", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");

  // Set future date
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateString = futureDate.toISOString().split("T")[0];

  fireEvent.change(dateInput, { target: { value: futureDateString } });

  // No error message should appear
  expect(
    screen.queryByText("Date cannot be in the past")
  ).not.toBeInTheDocument();
});

test("Guests validation passes with valid numbers", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  // Test valid numbers
  const validNumbers = ["1", "5", "10"];

  validNumbers.forEach((num) => {
    fireEvent.change(guestsInput, { target: { value: num } });
    expect(
      screen.queryByText("Must be at least 1 guest")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Maximum 10 guests allowed")
    ).not.toBeInTheDocument();
  });
});

// Test JavaScript validation functions - Invalid states
test("Date validation fails with past date", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");

  // Set past date
  fireEvent.change(dateInput, { target: { value: "2020-01-01" } });

  // Error message should appear
  expect(screen.getByText("Date cannot be in the past")).toBeInTheDocument();
});

test("Date validation fails with empty date", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");

  // Leave empty
  fireEvent.change(dateInput, { target: { value: "" } });

  // Error message should appear
  expect(screen.getByText("Date is required")).toBeInTheDocument();
});

test("Time validation fails with empty time", () => {
  render(<BookingForm />);

  const timeSelect = screen.getByLabelText("Choose time *");

  // Leave empty
  fireEvent.change(timeSelect, { target: { value: "" } });

  // Error message should appear
  expect(screen.getByText("Time is required")).toBeInTheDocument();
});

test("Guests validation fails with zero guests", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  fireEvent.change(guestsInput, { target: { value: "0" } });

  // Error message should appear
  expect(screen.getByText("Must be at least 1 guest")).toBeInTheDocument();
});

test("Guests validation fails with too many guests", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  fireEvent.change(guestsInput, { target: { value: "11" } });

  // Error message should appear
  expect(screen.getByText("Maximum 10 guests allowed")).toBeInTheDocument();
});

test("Guests validation fails with empty guests", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  fireEvent.change(guestsInput, { target: { value: "" } });

  // Error message should appear
  expect(screen.getByText("Number of guests is required")).toBeInTheDocument();
});

test("Guests validation fails with invalid input", () => {
  render(<BookingForm />);

  const guestsInput = screen.getByLabelText("Number of guests *");

  // Test with a value less than 1 (which should trigger "Must be at least 1 guest")
  fireEvent.change(guestsInput, { target: { value: "0" } });

  // Error message should appear
  expect(screen.getByText("Must be at least 1 guest")).toBeInTheDocument();
});

// Test form submission with validation
test("Form submission is prevented with invalid data", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");
  const submitButton = screen.getByText("Please fill all required fields");

  // Fill with invalid data
  fireEvent.change(dateInput, { target: { value: "2020-01-01" } });
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });

  // Button should still be disabled due to past date
  expect(submitButton).toBeDisabled();
});

test("Form submission works with valid data", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date *");
  const timeSelect = screen.getByLabelText("Choose time *");
  const guestsInput = screen.getByLabelText("Number of guests *");

  // Fill with valid data
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const futureDateString = futureDate.toISOString().split("T")[0];

  fireEvent.change(dateInput, { target: { value: futureDateString } });
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });

  // Button should be enabled
  const submitButton = screen.getByText("Make Your Reservation");
  expect(submitButton).not.toBeDisabled();

  // Submit the form
  fireEvent.click(submitButton);

  // Form should submit (console.log should be called)
  expect(mockConsoleLog).toHaveBeenCalledWith(
    "Form submitted:",
    expect.objectContaining({
      resDate: futureDateString,
      resTime: "19:00",
      guests: "4",
      occasion: "",
    })
  );
});
