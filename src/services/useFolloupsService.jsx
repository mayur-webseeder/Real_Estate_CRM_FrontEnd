import React from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLeadFollowUps } from "../store/leadsSlice";
import { useNavigate } from "react-router";
import {
  resetFollowUpsForm,
  setFollowups,
  setFollowupsTotalPage,
  setIsFollowupsLoading,
} from "../store/followupsSlice";

function useFolloupsService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addFolloups = async (data) => {
    try {
      const result = await axiosInstance.post(`/folloups/add`, data);
      if (result.status == 201) {
        toast.success("folloups added successfuly");
      }
      navigate(-1);
      dispatch(resetFollowUpsForm());
      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add folloups");
      throw error;
    } finally {
    }
  };
  const fetchFollowups = async (id) => {
    dispatch(setIsFollowupsLoading(true));
    try {
      const result = await axiosInstance.get(`/folloups/p`);
      if (result.status == 200) {
        dispatch(setFollowups(result.data.followups));
        dispatch(setFollowupsTotalPage(result.data.totalPages));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    } finally {
      dispatch(setIsFollowupsLoading(false));
    }
  };
  const getFolloupsByLeadId = async (id) => {
    try {
      const result = await axiosInstance.get(`/folloups/lead/${id}`);
      if (result.status == 200) {
        dispatch(setLeadFollowUps(result.data.followUps));
      }

      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to get lead folloups");
      throw error;
    }
  };
  return { addFolloups, getFolloupsByLeadId, fetchFollowups };
}

export default useFolloupsService;
