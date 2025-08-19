import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isDealSubmiting: false,
};
const dealsSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    setDealSubmiting: (state, action) => {
      state.isDealSubmiting = action.payload;
    },
  },
});
export const { setDealSubmiting } = dealsSlice.actions;
export default dealsSlice.reducer;
