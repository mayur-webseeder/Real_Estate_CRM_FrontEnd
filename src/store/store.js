import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import agentSlice from "./agentSlice";
import leadsSlice from "./leadsSlice";
import propertiesSlice from "./propertiesSlice";
export default configureStore({
  reducer: {
    auth: authSlice,
    agent: agentSlice,
    leads: leadsSlice,
    properties: propertiesSlice,
  },
});
