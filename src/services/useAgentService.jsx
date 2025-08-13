import React from "react";
import axiosInstance from "./axiosInstance";
import {
  setAgents,
  setAllAgentLoading,
  setTotalAgentPages,
  setPage,
  setSearch,
} from "../store/agentSlice";
import { useDispatch, useSelector } from "react-redux";

function useAgentService() {
  const dispatch = useDispatch();
  const { agent, isAllAgentLoading, page, limit, search, totalPages } =
    useSelector((state) => state.agent);
  const fetchAgents = async () => {
    dispatch(setAllAgentLoading(true));
    try {
      const res = await axiosInstance.get("/user/agents", {
        params: { page, limit, search },
      });

      dispatch(setAgents(res.data.data));
      dispatch(setTotalAgentPages(res.data.totalPages));
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      dispatch(setAllAgentLoading(false));
    }
  };
  const fetchAllAgents = async () => {
    dispatch(setAllAgentLoading(true));
    try {
      const res = await axiosInstance.get("/user/agents/all");
      dispatch(setAgents(res.data.data));
    } catch (error) {
      console.error("Error fetching agents:", error);
    } finally {
      dispatch(setAllAgentLoading(false));
    }
  };
  return { fetchAllAgents, fetchAgents };
}

export default useAgentService;
