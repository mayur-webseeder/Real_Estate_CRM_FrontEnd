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
  isFollowupsLoading: false,
  followups: [],
  page: 1,
  totalFollowupsPages: 1,
  limit: 10,
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
    setFollowups: (state, action) => {
      state.followups = action.payload;
    },
    setFollowupsTotalPage: (state, action) => {
      state.totalFollowupsPages = action.payload;
    },
    setIsFollowupsLoading: (state, action) => {
      state.isFollowupsLoading = action.payload;
    },
  },
});

export const {
  setFollowUpsFormData,
  resetFollowUpsForm,
  setFollowups,
  setFollowupsTotalPage,
  setIsFollowupsLoading,
} = followUpsSlice.actions;

export default followUpsSlice.reducer;
