// Reducer functions for managing available booking times

// Initialize available times using API
export const initializeTimes = () => {
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Use fetchAPI to get available times for today
  if (typeof window !== "undefined" && window.fetchAPI) {
    try {
      return window.fetchAPI(today);
    } catch (error) {
      console.error("Error fetching times from API:", error);
      // Fallback to default times if API throws error
      return ["17:00", "18:00", "19:00", "20:00", "21:00"];
    }
  }

  // Fallback to default times if API is not available
  return ["17:00", "18:00", "19:00", "20:00", "21:00"];
};

// Update available times based on selected date using API
export const updateTimes = (state, action) => {
  // Get the selected date from the action payload
  const selectedDate = action.payload?.date;

  if (selectedDate && typeof window !== "undefined" && window.fetchAPI) {
    try {
      // Use fetchAPI to get available times for the selected date
      return window.fetchAPI(selectedDate);
    } catch (error) {
      console.error("Error fetching times from API:", error);
      // Return current state if API throws error
      return state;
    }
  }

  // Return current state if no date provided or API not available
  return state;
};

// Main reducer function
export const timesReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_TIMES":
      return initializeTimes();
    case "UPDATE_TIMES":
      return updateTimes(state, action);
    default:
      return state;
  }
};
