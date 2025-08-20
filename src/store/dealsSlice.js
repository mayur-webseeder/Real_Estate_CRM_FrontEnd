import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDealSubmitting: false,
  columns: [],
  stages: [],
  columnTotals: {},
  deals: [],
  deal: null,
  isLoading: false,
};
const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDealSubmitting: (state, action) => {
      state.isDealSubmitting = action.payload;
    },
    setDealsColumns: (state, action) => {
      state.columns = action.payload;
    },
    setDealsStages: (state, action) => {
      state.stages = action.payload;
    },
    setDealsTotals: (state, action) => {
      state.columnTotals = action.payload;
    },
    setDeals: (state, action) => {
      state.deals = action.payload;
    },
    setDeal: (state, action) => {
      state.deal = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export const {
  setDealSubmitting,
  setDealsColumns,
  setDealsStages,
  setDealsTotals,
  setDeals,
  setDeal,
  setIsLoading,
} = dealsSlice.actions;
export default dealsSlice.reducer;
