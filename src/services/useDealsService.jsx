import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import {
  setDealsColumns,
  setDealsStages,
  setDealSubmitting,
} from "../store/dealsSlice";
import { toast } from "react-toastify";
function useDealsService() {
  const dispatch = useDispatch();
  const createDeal = async (data) => {
    dispatch(setDealSubmitting(true));
    try {
      const result = await axiosInstance.post(`/deals/create`, data);
      if (result.status == 201) {
        toast.success("Successfully create deal");
      }
      return result.data;
    } catch (error) {
      toast.error("Failed to add deal");
      console.error(error);
      throw error;
    } finally {
      dispatch(setDealSubmitting(false));
    }
  };

  const fetchBoard = async () => {
    const res = await axiosInstance.get(`/deals/board`);
    dispatch(setDealsStages(res.data.stages));
    dispatch(setDealsColumns(res.data.columns));
  };
  const updateStage = async (id, stage) => {
    try {
      const res = await axiosInstance.patch(`/deals/${id}/stage`, { stage });
      if (res.status === 200) {
        toast.success("Deal stage updated successfully");
      }
      return res.data;
    } catch (error) {
      toast.error("Failed to update deal stage");
      console.error(error);
      throw error;
    }
  };
  return { createDeal, fetchBoard, updateStage };
}

export default useDealsService;
