import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  properties: [],
  page: 1,
  limit: 10,
  search: "",
  totalPropertiesPage: 1,
  minPrice: null,
  maxPrice: null,
  //   sortBy = "createdAt",
  //   sortOrder = "desc",
};
const propertiesSlice = createSlice({
  name: "properties",
  initialState,

  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setPropertiesPage: (state, action) => {
      state.page = action.payload;
    },
    setTotalPropertiesPage: (state, action) => {
      state.totalPropertiesPage = action.payload;
    },
    setPropertiesSearch: (state, action) => {
      state.search = action.payload;
    },
    setPropertiesMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setPropertiesMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

export const {
  setProperties,
  setPropertiesPage,
  setTotalPropertiesPage,
  setPropertiesSearch,
  setPropertiesMinPrice,
  setPropertiesMaxPrice,
} = propertiesSlice.actions;
export default propertiesSlice.reducer;
