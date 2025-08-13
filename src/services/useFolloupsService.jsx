import React from "react";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLeadFollowUps } from "../store/leadsSlice";

function useFolloupsService() {
  const dispatch = useDispatch();
  const addFolloups = async (data) => {
    try {
      const result = await axiosInstance.post(`/folloups/add`, data);
      if (result.status == 201) {
        toast.success("folloups added successfuly");
      }
      return result.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add folloups");
      throw error;
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
  return { addFolloups, getFolloupsByLeadId };
}

export default useFolloupsService;
