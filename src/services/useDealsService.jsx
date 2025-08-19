import axiosInstance from "./axiosInstance";
import { useDispatch } from "react-redux";
import { setDealSubmiting } from "../store/dealsSlice";
import { toast } from "react-toastify";
function useDealsService() {
  const dispatch = useDispatch();
  const createDeal = async (data) => {
    dispatch(setDealSubmiting(true));
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
      dispatch(setDealSubmiting(true));
    }
  };
  return { createDeal };
}

export default useDealsService;
