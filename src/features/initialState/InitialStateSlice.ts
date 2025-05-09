import { createSlice } from "@reduxjs/toolkit";

interface State {
  value: number;
}
const initialState: State = {
  value: 0,
};
// redux toolkit framework for handling global state
const InitialStateSlice = createSlice({
  name: "InitialState",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      console.log("action now", action);
      state.value += action.payload;
    },
  },
});

export const { increment, incrementByAmount, decrement } =
  InitialStateSlice.actions;

export default InitialStateSlice.reducer;
