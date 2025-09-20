import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "../components/BookingForm.tsx";

// Mock window.alert
const mockAlert = jest.fn();
Object.defineProperty(window, "alert", {
  value: mockAlert,
  writable: true,
});

// Clear mocks before each test
beforeEach(() => {
  mockAlert.mockClear();
});

// Test for static text being rendered in the BookingForm component
test("Renders the BookingForm heading", () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Make Your Reservation");
  expect(headingElement).toBeInTheDocument();
});

// Test for form labels
test("Renders all form labels", () => {
  render(<BookingForm />);

  const dateLabel = screen.getByText("Choose date");
  const timeLabel = screen.getByText("Choose time");
  const guestsLabel = screen.getByText("Number of guests");
  const occasionLabel = screen.getByText("Occasion");

  expect(dateLabel).toBeInTheDocument();
  expect(timeLabel).toBeInTheDocument();
  expect(guestsLabel).toBeInTheDocument();
  expect(occasionLabel).toBeInTheDocument();
});

// Test for form inputs
test("Renders all form inputs", () => {
  render(<BookingForm />);

  const dateInput = screen.getByLabelText("Choose date");
  const timeSelect = screen.getByLabelText("Choose time");
  const guestsInput = screen.getByLabelText("Number of guests");
  const occasionSelect = screen.getByLabelText("Occasion");

  expect(dateInput).toBeInTheDocument();
  expect(timeSelect).toBeInTheDocument();
  expect(guestsInput).toBeInTheDocument();
  expect(occasionSelect).toBeInTheDocument();
});

// Test for available times options
test("Renders available times options", () => {
  render(<BookingForm />);

  const timeSelect = screen.getByLabelText("Choose time");
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

  const dateInput = screen.getByLabelText("Choose date");
  const timeSelect = screen.getByLabelText("Choose time");
  const guestsInput = screen.getByLabelText("Number of guests");
  const submitButton = screen.getByText("Make Your Reservation");

  // Fill out the form
  fireEvent.change(dateInput, { target: { value: "2024-12-31" } });
  fireEvent.change(timeSelect, { target: { value: "19:00" } });
  fireEvent.change(guestsInput, { target: { value: "4" } });

  // Submit the form
  fireEvent.click(submitButton);

  // Check if form resets after submission
  expect(dateInput.value).toBe("");
  expect(timeSelect.value).toBe("");
  expect(guestsInput.value).toBe("");
});

// Test form validation
test("Form validation works correctly", () => {
  render(<BookingForm />);

  const submitButton = screen.getByText("Make Your Reservation");

  // Try to submit empty form
  fireEvent.click(submitButton);

  // Check if required fields are still empty (form should not submit)
  const dateInput = screen.getByLabelText("Choose date");
  const timeSelect = screen.getByLabelText("Choose time");
  const guestsInput = screen.getByLabelText("Number of guests");

  expect(dateInput.value).toBe("");
  expect(timeSelect.value).toBe("");
  expect(guestsInput.value).toBe("");
});
