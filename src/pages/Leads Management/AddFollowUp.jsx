import React, { useState, useCallback } from "react";
import CommonInput from "../../components/input/CommonInput";
import CommonSelect from "../../components/input/CommonSelect";
import { useDispatch, useSelector } from "react-redux";
import useFolloupsService from "../../services/useFolloupsService";
import useIcon from "../../hooks/useIcon";
import { useNavigate, useParams } from "react-router";
import { setFollowUpsFormData } from "../../store/followupsSlice";
import CommonBtn from "../../components/buttons/CommonBtn";

function AddFollowUp() {
  const { leadId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { followUpFormData } = useSelector((state) => state.followups);
  const [error, setError] = useState("");
  const { addFolloups } = useFolloupsService();
  const dispatch = useDispatch();
  const icons = useIcon();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setFollowUpsFormData({
        ...followUpFormData,
        [name]: type === "checkbox" ? checked : value,
      })
    );
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await addFolloups(followUpFormData);
  };

  const handleClose = () => {
    navigate(-1);
    resetFollowUpsForm();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
    >
      <div className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl  overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white relative">
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
          >
            {icons["close"]}
          </button>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
              {icons["clock"]}
            </div>
            <div>
              <h2 className="text-2xl font-bold">Add Follow-Up</h2>
              <p className="text-blue-100 text-sm">
                Schedule your next interaction
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Main Fields */}
            <div className="space-y-6">
              <div className="group">
                <CommonInput
                  label="Title"
                  name="title"
                  value={followUpFormData.title}
                  onChange={handleChange}
                  placeholder="Enter follow-up title"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="group">
                <CommonInput
                  label="Description"
                  name="description"
                  value={followUpFormData.description}
                  onChange={handleChange}
                  placeholder="Add detailed description..."
                  disabled={isSubmitting}
                />
              </div>

              <div className="group">
                <CommonInput
                  label="Follow-Up Date"
                  name="followupsDate"
                  type="date"
                  value={followUpFormData.followupsDate}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Settings Grid */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span>{icons["settings"]}</span>
                Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <CommonSelect
                    label="Type"
                    name="type"
                    value={followUpFormData.type}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    options={[
                      { label: " Email", value: "email" },
                      { label: " Message", value: "message" },
                      { label: " Call", value: "call" },
                      { label: " Meeting", value: "meeting" },
                    ]}
                  />
                </div>

                <div className="space-y-1">
                  <CommonSelect
                    label="Status"
                    name="status"
                    value={followUpFormData.status}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    options={[
                      { label: "Pending", value: "pending" },
                      { label: " Completed", value: "completed" },
                      { label: " Canceled", value: "canceled" },
                    ]}
                  />
                </div>

                <div className="space-y-1">
                  <CommonSelect
                    label="Priority"
                    name="priority"
                    value={followUpFormData.priority}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    options={[
                      { label: "Low", value: "low" },
                      { label: "Medium", value: "medium" },
                      { label: "High", value: "high" },
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-all duration-200 disabled:opacity-50 hover:shadow-sm"
              >
                Cancel
              </button>
              <CommonBtn
                type="submit"
                disabled={isSubmitting}
                className="  bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-medium transition-all duration-200 hover:shadow-lg transform "
              >
                {isSubmitting ? (
                  <>
                    {icons["spinner1"]}
                    Adding...
                  </>
                ) : (
                  <>
                    {icons["plus"]}
                    Add Follow-Up
                  </>
                )}
              </CommonBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddFollowUp;
