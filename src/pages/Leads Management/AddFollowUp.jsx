import React, { useState } from "react";
import CommonInput from "../../components/input/CommonInput";
import CommonSelect from "../../components/input/CommonSelect";
import CommonBtn from "../../components/buttons/CommonBtn";
import { useDispatch, useSelector } from "react-redux";
import { setFollowupOpen } from "../../store/leadsSlice";
import useFolloupsService from "../../services/useFolloupsService";
function AddFollowUp() {
  const { isFollowupOpen, leadId } = useSelector((state) => state.leads);

  const [formData, setFormData] = useState({
    leadId: leadId || "",
    title: "",
    description: "",
    followupsDate: "",
    type: "email",
    status: "pending",
    priority: "medium",
    reminderSent: false,
  });
  const dispatch = useDispatch();
  const { addFolloups } = useFolloupsService();

  if (!isFollowupOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addFolloups(formData);
      setFormData({
        leadId: leadId || "",
        createdBy: createdBy || "",
        title: "",
        description: "",
        followupsDate: "",
        type: "email",
        status: "pending",
        priority: "medium",
        reminderSent: false,
        companyId: companyId || "",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    dispatch(setFollowupOpen());
  };
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white w-full max-w-lg p-6 rounded-lg shadow-lg "
      >
        {/* Close Button */}
        <CommonBtn
          action={handleClose}
          className={"absolute right-0 top-0 rounded-full px-2.5"}
        >
          ✕
        </CommonBtn>
        <h2 className="text-2xl font-bold mb-4">Add Follow-Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter follow-up title"
            required
          />

          <CommonInput
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          <CommonInput
            label="Follow-Up Date"
            name="followupsDate"
            type="date"
            value={formData.followupsDate}
            onChange={handleChange}
            required
          />

          <CommonSelect
            label="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            options={[
              { label: "Email", value: "email" },
              { label: "Message", value: "message" },
              { label: "Call", value: "call" },
              { label: "Meeting", value: "meeting" },
            ]}
          />

          <CommonSelect
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            options={[
              { label: "Pending", value: "pending" },
              { label: "Completed", value: "completed" },
              { label: "Canceled", value: "canceled" },
            ]}
          />

          <CommonSelect
            label="Priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ]}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Follow-Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFollowUp;
