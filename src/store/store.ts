// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import neighborhoodDataReducer from "./NeighbohoodDataSlice"; // Import your slice reducer

const store = configureStore({
  reducer: {
    neighborhoodData: neighborhoodDataReducer, // Add your slice reducer to the store
    // Add other reducers here if you have them
  },
});

export default store;
