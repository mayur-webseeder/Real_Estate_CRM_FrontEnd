import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  leadsFormData: {
    name: "",
    mobileNumber: "",
    email: "",
    source: "",
    status: "new",
    interestedIn: [],
    assignedTo: "",
    companyId: "",
  },
  isLeadLoading: false,
  leads: [],
  lead: {},
  search: "",
  page: 1,
  limit: 10,
  totalPages: 1,
  isFollowupOpen: false,
  leadId: "",
  isLeadEditing: false,
  leadFolloups: [],
};
const leadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    setLeadsFormData: (state, action) => {
      state.leadsFormData = action.payload;
    },
    setLeads: (state, action) => {
      state.leads = action.payload;
    },
    setLeadsSearch: (state, action) => {
      state.search = action.payload;
    },
    setLeadsTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setLeadPage: (state, action) => {
      state.page = action.payload;
    },
    setIsLeadsLoading: (state, action) => {
      state.isLeadLoading = action.payload;
    },
    setFollowupOpen: (state, action) => {
      state.isFollowupOpen = !state.isFollowupOpen;
    },
    setLeadId: (state, action) => {
      state.leadId = action.payload;
    },
    setIsEditingLead: (state, action) => {
      state.isLeadEditing = !state.isLeadEditing;
    },
    setLeadFollowUps: (state, action) => {
      state.leadFolloups = action.payload;
    },
    setLeadData: (state, action) => {
      state.lead = action.payload;
    },
  },
});
export const {
  setLeadsFormData,
  setLeads,
  setLeadsTotalPages,
  setLeadPage,
  setIsLeadsLoading,
  setFollowupOpen,
  setLeadId,
  setIsEditingLead,
  setLeadFollowUps,
  setLeadData,
} = leadsSlice.actions;
export default leadsSlice.reducer;
