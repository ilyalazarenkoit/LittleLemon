// Fallback tests for bookingTimes functions without mocks
import { initializeTimes, updateTimes } from "../utils/bookingTimes";

// Test for initializeTimes fallback when API is not available
test("initializeTimes returns fallback times when fetchAPI is not available", () => {
  // Temporarily remove fetchAPI from window
  const originalFetchAPI = window.fetchAPI;
  delete window.fetchAPI;

  const result = initializeTimes();

  // Should return fallback times
  expect(result).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00"]);

  // Restore fetchAPI
  window.fetchAPI = originalFetchAPI;
});

// Test for updateTimes fallback when API is not available
test("updateTimes returns current state when fetchAPI is not available", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  // Temporarily remove fetchAPI from window
  const originalFetchAPI = window.fetchAPI;
  delete window.fetchAPI;

  const action = {
    type: "UPDATE_TIMES",
    payload: { date: "2024-12-31" },
  };

  const result = updateTimes(initialState, action);

  // Should return current state when API is not available
  expect(result).toBe(initialState);

  // Restore fetchAPI
  window.fetchAPI = originalFetchAPI;
});

// Test for initializeTimes fallback when window is undefined
test("initializeTimes returns fallback times when window is undefined", () => {
  // Temporarily store original window
  const originalWindow = global.window;
  global.window = undefined;

  const result = initializeTimes();

  // Should return fallback times
  expect(result).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00"]);

  // Restore window
  global.window = originalWindow;
});

// Test for updateTimes fallback when window is undefined
test("updateTimes returns current state when window is undefined", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  // Temporarily store original window
  const originalWindow = global.window;
  global.window = undefined;

  const action = {
    type: "UPDATE_TIMES",
    payload: { date: "2024-12-31" },
  };

  const result = updateTimes(initialState, action);

  // Should return current state when window is undefined
  expect(result).toBe(initialState);

  // Restore window
  global.window = originalWindow;
});
