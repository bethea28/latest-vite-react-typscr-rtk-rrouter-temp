import { createSlice } from "@reduxjs/toolkit";
import { data as d3Data } from "../../d3Data";

const initialState = {
  data: d3Data, // initial geojson data
  loading: false,
  error: null,
};
// redux toolkit framework for handling global state
const NeighborhoodDataSlice = createSlice({
  name: "NeighborhoodData",
  initialState,
  reducers: {
    fetchDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const { fetchDataStart } =
  NeighborhoodDataSlice.actions;


export default NeighborhoodDataSlice.reducer;
