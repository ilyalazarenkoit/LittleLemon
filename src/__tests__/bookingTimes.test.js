import {
  initializeTimes,
  updateTimes,
  timesReducer,
} from "../utils/bookingTimes";

// Mock window.fetchAPI for testing
const mockFetchAPI = jest.fn();
beforeAll(() => {
  // Mock the global window object
  Object.defineProperty(window, "fetchAPI", {
    value: mockFetchAPI,
    writable: true,
  });
});

beforeEach(() => {
  mockFetchAPI.mockClear();
});

// Test for initializeTimes function with API integration
test("initializeTimes calls fetchAPI with today's date and returns API data", () => {
  const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];
  mockFetchAPI.mockReturnValue(expectedTimes);

  const result = initializeTimes();

  // Verify the function returns the API data
  expect(result).toEqual(expectedTimes);
  expect(result).toHaveLength(5);
  expect(result).toContain("17:00");
  expect(result).toContain("21:00");

  // Verify fetchAPI was called with today's date in correct format
  expect(mockFetchAPI).toHaveBeenCalledTimes(1);
  expect(mockFetchAPI).toHaveBeenCalledWith(
    expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
  );

  // Verify the date format is correct (YYYY-MM-DD)
  const calledDate = mockFetchAPI.mock.calls[0][0];
  expect(calledDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);

  // Verify it's a valid date
  const date = new Date(calledDate);
  expect(date).toBeInstanceOf(Date);
  expect(date.getTime()).not.toBeNaN();
});

// Test for updateTimes function with API integration
test("updateTimes calls fetchAPI with provided date and returns API data", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];
  const newTimes = ["18:00", "19:00", "20:00"];
  mockFetchAPI.mockReturnValue(newTimes);

  const action = {
    type: "UPDATE_TIMES",
    payload: { date: "2024-12-31" },
  };

  const result = updateTimes(initialState, action);

  // Verify the function returns the API data
  expect(result).toEqual(newTimes);
  expect(result).toHaveLength(3);
  expect(result).toContain("18:00");
  expect(result).toContain("20:00");

  // Verify fetchAPI was called with the correct date
  expect(mockFetchAPI).toHaveBeenCalledTimes(1);
  expect(mockFetchAPI).toHaveBeenCalledWith("2024-12-31");
});

// Test for updateTimes with different date formats
test("updateTimes handles different valid date formats", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];
  const newTimes = ["19:00", "20:00", "21:00"];
  mockFetchAPI.mockReturnValue(newTimes);

  const testDates = ["2024-01-01", "2024-12-25", "2025-06-15"];

  testDates.forEach((date) => {
    mockFetchAPI.mockClear();
    mockFetchAPI.mockReturnValue(newTimes);

    const action = {
      type: "UPDATE_TIMES",
      payload: { date },
    };

    const result = updateTimes(initialState, action);

    expect(result).toEqual(newTimes);
    expect(mockFetchAPI).toHaveBeenCalledWith(date);
  });
});

// Test for updateTimes function without date
test("updateTimes returns current state when no date provided", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  const action = {
    type: "UPDATE_TIMES",
    payload: {},
  };

  const result = updateTimes(initialState, action);

  expect(result).toBe(initialState);
  expect(mockFetchAPI).not.toHaveBeenCalled();
});

// Test for updateTimes with null/undefined date
test("updateTimes handles null and undefined dates gracefully", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  const testCases = [
    { payload: { date: null } },
    { payload: { date: undefined } },
    { payload: { date: "" } },
    { payload: {} },
  ];

  testCases.forEach((action, index) => {
    mockFetchAPI.mockClear();

    const result = updateTimes(initialState, action);

    expect(result).toBe(initialState);
    expect(mockFetchAPI).not.toHaveBeenCalled();
  });
});

// Test for API error handling
test("initializeTimes handles API errors gracefully", () => {
  // Mock fetchAPI to throw an error
  mockFetchAPI.mockImplementation(() => {
    throw new Error("API Error");
  });

  const result = initializeTimes();

  // Should return fallback times when API throws error
  expect(result).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00"]);
  expect(mockFetchAPI).toHaveBeenCalledTimes(1);
});

// Test for updateTimes API error handling
test("updateTimes handles API errors gracefully", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];

  // Mock fetchAPI to throw an error
  mockFetchAPI.mockImplementation(() => {
    throw new Error("API Error");
  });

  const action = {
    type: "UPDATE_TIMES",
    payload: { date: "2024-12-31" },
  };

  const result = updateTimes(initialState, action);

  // Should return current state when API throws error
  expect(result).toBe(initialState);
  expect(mockFetchAPI).toHaveBeenCalledWith("2024-12-31");
});

// Test for timesReducer with INITIALIZE_TIMES action
test("timesReducer initializes times correctly", () => {
  const expectedTimes = ["17:00", "18:00", "19:00", "20:00", "21:00"];
  mockFetchAPI.mockReturnValue(expectedTimes);

  const action = { type: "INITIALIZE_TIMES" };
  const result = timesReducer([], action);

  expect(result).toEqual(expectedTimes);
  expect(mockFetchAPI).toHaveBeenCalledWith(
    expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/)
  );
});

// Test for timesReducer with UPDATE_TIMES action
test("timesReducer updates times correctly", () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00"];
  const newTimes = ["18:00", "19:00", "20:00"];
  mockFetchAPI.mockReturnValue(newTimes);

  const action = {
    type: "UPDATE_TIMES",
    payload: { date: "2024-12-31" },
  };

  const result = timesReducer(initialState, action);

  expect(result).toEqual(newTimes);
  expect(mockFetchAPI).toHaveBeenCalledWith("2024-12-31");
});

// Test for timesReducer with unknown action
test("timesReducer returns current state for unknown action", () => {
  const initialState = ["17:00", "18:00"];
  const action = { type: "UNKNOWN_ACTION" };

  const result = timesReducer(initialState, action);

  expect(result).toBe(initialState);
});
