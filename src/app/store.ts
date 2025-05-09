// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { initialStateService } from "../features/initialState/initialStateService";
import initialState from "../features/initialState/InitialStateSlice"; // Import your slice reducer
// console.log("test me");
const store = configureStore({
  reducer: {
    [initialStateService.reducerPath]: initialStateService.reducer,
    initialState: initialState, // Add your slice reducer to the store
    // Add other reducers here if you have them
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(initialStateService.middleware),
});
setupListeners(store.dispatch);

export default store;
