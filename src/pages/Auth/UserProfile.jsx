import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../services/axiosInstance";
import useIcon from "../../hooks/useIcon";
import { setLogedInUser } from "../../store/authSlice";
import { toast } from "react-toastify";
import CommonBtn from "../../components/buttons/CommonBtn";

const profileFields = [
  { label: "Username", name: "userName" },
  { label: "Email", name: "email" },
  { label: "Mobile Number", name: "mobileNumber" },
  { label: "Territory", name: "territory" },
  { label: "Total Deals", name: "totalDeals" },
  { label: "Total Sales Value", name: "totalSalesValue" },
  { label: "Commission Rate", name: "commissionRate" },
  { label: "Role", name: "role" },
];

const UserProfile = () => {
  const { logedInUser } = useSelector((state) => state.auth);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateDate] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const icons = useIcon();
  const dispatch = useDispatch();
  // Handle input changes
  const handleChange = (e) => {
    setUpdateDate({ [e.target.name]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        `/user/update/${logedInUser._id}`,
        updateData
      );
      if (response.status == 201) {
        setEditMode(false);
        setFormData({});
        console.log(response.data.data);
        sessionStorage.setItem(
          "_userDetails",
          JSON.stringify(response.data.data)
        );
        dispatch(setLogedInUser(response.data.data));
        toast.success("Update successful");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setFormData(logedInUser || {});
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData({});
    setEditMode(false);
  };

  if (!logedInUser?._id) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mb-3"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-inherit">
      {/* Header */}
      <div className="p-6 border rounded-xl mb-5 border-inherit">
        <div className="flex items-center justify-between border-inherit">
          <div className="flex items-center space-x-3 border-inherit">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              {icons["user"]}
            </div>
            <div>
              <h1 className="text-xl font-semibold ">
                {logedInUser?.userName || "User Profile"}
              </h1>
              <p className="text-sm ">
                {logedInUser?.role || "Member"} •{" "}
                {logedInUser?.territory || "Global"}
              </p>
            </div>
          </div>

          {!editMode && (
            <CommonBtn
              action={handleEdit}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Edit Profile
            </CommonBtn>
          )}
        </div>
      </div>

      {/* Profile Fields */}
      <div className="flex flex-col gap-4 p-6 border rounded-xl border-inherit">
        {/* Stats for agents */}
        {logedInUser.role === "agent" && (
          <div className="p-5 border-inherit">
            <div className="grid grid-cols-3 gap-6 text-center border-inherit">
              <div>
                <div className="text-2xl font-semibold ">
                  {logedInUser?.totalDeals || "0"}
                </div>
                <div className="text-sm ">Total Deals</div>
              </div>
              <div>
                <div className="text-2xl font-semibold ">
                  ${logedInUser?.totalSalesValue || "0"}
                </div>
                <div className="text-sm ">Sales Value</div>
              </div>
              <div>
                <div className="text-2xl font-semibold ">
                  {logedInUser?.commissionRate || "0"}%
                </div>
                <div className="text-sm ">Commission Rate</div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start border-inherit">
          {profileFields.map((field) => (
            <div className="border-inherit" key={field.name}>
              <label className="block text-sm font-medium  mb-1">
                {field.label}
              </label>
              {editMode && field.name !== "role" ? (
                <input
                  type="text"
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border  rounded-md border-inherit"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
              ) : (
                <div className="px-3 py-2 rounded-md border border-inherit ">
                  <span className="">
                    {logedInUser?.[field.name] || (
                      <span className=" italic">Not specified</span>
                    )}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {editMode && (
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-inherit">
            <button
              action={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 text-sm  rounded-md transition-colors disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              action={handleSave}
              disabled={isLoading}
              className="inline-flex items-center px-4 py-2 text-sm bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-md transition-colors disabled:cursor-not-allowed"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
