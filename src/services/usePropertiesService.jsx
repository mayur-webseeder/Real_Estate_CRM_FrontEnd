import { toast } from "react-toastify";
import {
  setProperties,
  setTotalPropertiesPage,
} from "../store/propertiesSlice";
import axiosInstance from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";
function usePropertiesService() {
  const { search, page, maxPrice, minPrice } = useSelector(
    (state) => state.properties
  );
  const dispatch = useDispatch();
  const fetchProperties = async () => {
    try {
      const response = await axiosInstance.get(`/properties/p`, {
        params: {
          search,
          page,
          maxPrice,
          minPrice,
        },
      });
      dispatch(setProperties(response.data.properties));
      dispatch(setTotalPropertiesPage(response.data.totalPages));
    } catch (error) {
      console.error(error);
    }
  };
  const addNewProperty = async (formData) => {
    try {
      const result = await axiosInstance.post(`/properties/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Property added successfully!");
      return result;
    } catch (error) {
      console.error(error);
      toast.error("Error occured while adding property");
      throw error;
    }
  };
  return { fetchProperties, addNewProperty };
}

export default usePropertiesService;
