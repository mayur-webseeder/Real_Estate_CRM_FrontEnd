import React, { useEffect } from "react";
import CommonInput from "../../../components/input/CommonInput";
import CommonSelect from "../../../components/input/CommonSelect";
import { Loader, Phone, Target, User, Users } from "lucide-react";
import useIcon from "../../../hooks/useIcon";
import { useSelector } from "react-redux";
import useAgentService from "../../../services/useAgentService";
const properties = [
  { _id: "1", name: "Sunset Villa", type: "Villa" },
  { _id: "2", name: "Ocean View Apartment", type: "Apartment" },
  { _id: "3", name: "Downtown Office", type: "Commercial" },
];

const statusOptions = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "site_visit", label: "Site Visit" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed", label: "Closed" },
  { value: "lost", label: "Lost" },
];

const sourceOptions = [
  "Website",
  "Facebook",
  "Google Ads",
  "Referral",
  "Walk-in",
  "Phone Call",
  "Email",
  "Other",
];

function LeadFromModel({
  data,
  handleSubmit,
  handleInputChange,
  resetForm,
  isLoading,
  heading,
  subHeading,
}) {
  const { agents } = useSelector((state) => state.agent);
  const { fetchAllAgents } = useAgentService();

  const icons = useIcon();
  useEffect(() => {
    fetchAllAgents();
  }, []);
  return (
    <div className="w-full border-inherit">
      <div className="rounded-xl border  p-6 mb-6 border-inherit shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-full text-start">
            <h2 className="text-xl font-medium text-gray-900">{heading}</h2>
            <p className="text-gray-600 mt-1">{subHeading}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6 border-inherit border rounded-xl  shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
          {/* Name */}
          <CommonInput
            label={
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 text-gray-500" />
                Name
              </div>
            }
            required={true}
            type="text"
            name="name"
            value={data.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter full name"
          />

          {/* Mobile Number */}
          <CommonInput
            label={
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 text-gray-500" />
                Mobile Number
              </div>
            }
            required={true}
            type="tel"
            name="mobileNumber"
            value={data.mobileNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter mobile number"
          />

          {/* Email */}
          <CommonInput
            type="email"
            name="email"
            className="border-inherit"
            placeholder="Enter email address"
            label={
              <div className="flex gap-2 text-sm items-center">
                {" "}
                <span className="text-lg"> {icons["mail"]}</span> Email
              </div>
            }
            value={data.email}
            onChange={handleInputChange}
          />

          {/* Source */}
          <CommonSelect
            label={
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target className="w-4 h-4 text-gray-500" />
                Source
              </div>
            }
            options={sourceOptions}
            name="source"
            value={data.source}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {/* <div className="border-inherit">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Target className="w-4 h-4 text-gray-500" />
              Source
            </label>
            <select
              name="source"
              value={data.source}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select source</option>
              {sourceOptions.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div> */}

          {/* Status */}
          <CommonSelect
            label={"Status"}
            name="status"
            value={data.status}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            options={statusOptions}
          />
          {/* Assigned To */}
          <div className="flex flex-col justify-start w-full border-inherit">
            <label className="flex   items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              Assign To
            </label>
            <select
              name="assignedTo"
              value={data.assignedTo || data.assignedTo?._id}
              defaultValue={data.assignedTo?._id || data.assignedTo}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 max-w-md"
            >
              <option value="">Select user</option>
              {agents.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.userName} - {user.role}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interested Properties */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Interested Properties
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {properties.map((property) => (
              <div
                key={property._id}
                onClick={() => handlePropertySelect(property._id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                  formData.interestedIn.includes(property._id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-inherit"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm text-gray-900">
                      {property.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {property.type}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      formData.interestedIn.includes(property._id)
                        ? "bg-blue-500 border-blue-500"
                        : "border-inherit"
                    }`}
                  >
                    {formData.interestedIn.includes(property._id) && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
          >
            {isLoading ? <Loader /> : "Add Lead"}
          </button>
          <button
            onClick={resetForm}
            className="px-6 py-3 border border-inherit text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadFromModel;
