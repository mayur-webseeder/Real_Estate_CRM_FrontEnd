import { createSlice } from "@reduxjs/toolkit";

export const defaultFollowUpFormData = {
  leadId: "",
  createdBy: "",
  title: "",
  description: "",
  followupsDate: "",
  type: "email",
  status: "pending",
  priority: "medium",
  reminderSent: false,
};

const initialState = {
  followUpFormData: { ...defaultFollowUpFormData },
};

const followUpsSlice = createSlice({
  name: "followups",
  initialState,
  reducers: {
    setFollowUpsFormData: (state, action) => {
      state.followUpFormData = { ...state.followUpFormData, ...action.payload };
    },
    resetFollowUpsForm: (state) => {
      state.followUpFormData = { ...defaultFollowUpFormData };
    },
  },
});

export const { setFollowUpsFormData, resetFollowUpsForm } =
  followUpsSlice.actions;

export default followUpsSlice.reducer;
