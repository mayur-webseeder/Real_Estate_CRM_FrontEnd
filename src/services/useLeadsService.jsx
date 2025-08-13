import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "./axiosInstance";
import {
  setIsEditingLead,
  setIsLeadsLoading,
  setLeadData,
  setLeads,
  setLeadsTotalPages,
} from "../store/leadsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function useLeadsService() {
  const { search, page, limit } = useSelector((state) => state.leads);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchLeads = async () => {
    try {
      const result = await axiosInstance.get(`/leads/p`, {
        params: {
          search,
          page,
          limit,
        },
      });
      dispatch(setLeads(result.data.data));
      dispatch(setLeadsTotalPages(result.data.totalPages));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    }
  };
  const fetchLeadById = async (id) => {
    try {
      const result = await axiosInstance.get(`/leads/lead/${id}`);
      dispatch(setLeadData(result.data));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    }
  };
  const fetchDisposedLeads = async () => {
    try {
      const result = await axiosInstance.get(`/leads/disposed`, {
        params: {
          search,
          page,
          limit,
        },
      });
      dispatch(setLeads(result.data.data));
      dispatch(setLeadsTotalPages(result.data.totalPages));
      return result.data;
    } catch (error) {
      console.error("error while fetching leads", error);
      throw error;
    }
  };

  const addNewLeads = async (data) => {
    dispatch(setIsLeadsLoading(true));
    try {
      const result = await axiosInstance.post(`/leads/create`, data);
      if (result.status == 201) {
        toast.success("Leads Successfully added");
      }
      return result.data;
    } catch (error) {
      console.error("error while adding leads", error);
      toast.error("Failed to add leads");
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };

  const editLead = async (data) => {
    dispatch(setIsLeadsLoading(true));
    try {
      const result = await axiosInstance.put(`/leads/update/${data._id}`, data);
      if (result.status == 201) {
        toast.success("Leads Successfully updated");
      }
      navigate(-1);
      return result.data;
    } catch (error) {
      console.error("error while updating leads", error);
      toast.error("Failed to updating leads");
      throw error;
    } finally {
      dispatch(setIsLeadsLoading(false));
    }
  };

  const toggelDisposeLead = async ({ id, isDispose }) => {
    try {
      const result = await axiosInstance.patch(`/leads/dispose/${id}`, {
        isDispose,
      });
      if (result.status == 200) {
        toast.success(
          `Successfully  ${isDispose ? "undisposed" : "disposed"} leads`
        );
      }

      return result.data;
    } catch (error) {
      console.error("error while dispose leads", error);
      toast.error("Failed to dispose leads");
      throw error;
    }
  };

  return {
    addNewLeads,
    fetchLeads,
    toggelDisposeLead,
    fetchDisposedLeads,
    editLead,
    fetchLeadById,
  };
}

export default useLeadsService;
