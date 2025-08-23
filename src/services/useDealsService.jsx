import axiosInstance from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  setDealsColumns,
  setDealsStages,
  setDealSubmitting,
} from "../store/dealsSlice";
import { toast } from "react-toastify";
function useDealsService() {
  const { assignedTo, propertyId, startDate, endDate, minValue, maxValue } =
    useSelector((state) => state.deals);

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
    try {
      const res = await axiosInstance.get(`/deals/board`, {
        params: {
          assignedTo,
          propertyId,
          startDate,
          endDate,
          minValue,
          maxValue,
        },
      });
      dispatch(setDealsStages(res.data.stages));
      dispatch(setDealsColumns(res.data.columns));
    } catch (error) {
      toast.error("Failed to fetch deal board");
      console.error(error);
      throw error;
    }
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
