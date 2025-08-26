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
  isFollowupSubmitting: false,
  followups: [],
  page: 1,
  totalFollowupsPages: 1,
  limit: 10,
  assignedTo: "",
  status: "",
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
    setFolloupsAssginedTo: (state, action) => {
      state.assignedTo = action.payload;
    },
    setFolloupsStatus: (state, action) => {
      state.status = action.payload;
    },
    setIsfollowupSubmitting: (state, action) => {
      state.isFollowupSubmitting = action.payload;
    },
  },
});

export const {
  setFollowUpsFormData,
  resetFollowUpsForm,
  setFollowups,
  setFollowupsTotalPage,
  setIsFollowupsLoading,
  setFolloupsAssginedTo,
  setFolloupsStatus,
  setIsfollowupSubmitting,
} = followUpsSlice.actions;

export default followUpsSlice.reducer;
