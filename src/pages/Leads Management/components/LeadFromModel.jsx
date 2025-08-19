import React, { useEffect, useMemo } from "react";
import CommonInput from "../../../components/input/CommonInput";
import CommonSelect from "../../../components/input/CommonSelect";
import { Loader, Phone, Target, User, Users } from "lucide-react";
import useIcon from "../../../hooks/useIcon";
import { useSelector } from "react-redux";
import useTeamService from "../../../services/useTeamService";

// Constants moved to top level to prevent recreation on each render
const PROPERTY_TYPES = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Land", label: "Land" },
];

const LOOKING_FOR_OPTIONS = [
  { value: "buy", label: "Buy" },
  { value: "rent", label: "Rent" },
];

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "site_visit", label: "Site Visit" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed", label: "Closed" },
  { value: "lost", label: "Lost" },
];

const SOURCE_OPTIONS = [
  { value: "Website", label: "Website" },
  { value: "Facebook", label: "Facebook" },
  { value: "Google Ads", label: "Google Ads" },
  { value: "Referral", label: "Referral" },
  { value: "Walk-in", label: "Walk-in" },
  { value: "Phone Call", label: "Phone Call" },
  { value: "Email", label: "Email" },
  { value: "Other", label: "Other" },
];

function LeadFormModel({
  data,
  handleSubmit,
  handleInputChange,
  resetForm,
  isLoading,
  heading,
  subHeading,
}) {
  const { agents, loading: agentsLoading } = useSelector((state) => state.team);
  const { fetchAllAgents } = useTeamService();
  const icons = useIcon();

  // Memoize agent options to prevent unnecessary re-renders
  const agentOptions = useMemo(() => {
    return agents.map((agent) => ({
      value: agent._id,
      label: `${agent.userName} - ${agent.role}`,
    }));
  }, [agents]);

  useEffect(() => {
    if (!agents.length && !agentsLoading) {
      fetchAllAgents();
    }
  }, [fetchAllAgents, agents.length, agentsLoading]);

  // Handle location preference change with better error handling
  const handleLocationChange = (e) => {
    const value = e.target.value;
    const locations = value
      ? value
          .split(",")
          .map((loc) => loc.trim())
          .filter((loc) => loc)
      : [];

    handleInputChange({
      target: {
        name: "propertyRequirement.locationPreference",
        value: locations,
      },
    });
  };

  // Improved field validation display
  const renderFieldLabel = (icon, text, required = false) => (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
      {icon}
      {text}
      {required && <span className="text-red-500">*</span>}
    </div>
  );

  return (
    <div className="w-full border-inherit">
      {/* Header Section */}
      <div className="rounded-xl border p-6 mb-6 border-inherit shadow-sm bg-white">
        <div className="flex items-center gap-3">
          <div className="w-full text-start">
            <h2 className="text-xl font-medium text-gray-900">{heading}</h2>
            {subHeading && <p className="text-gray-600 mt-1">{subHeading}</p>}
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="p-6 space-y-6 border-inherit border rounded-xl shadow-sm bg-white">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-inherit">
          {/* Name */}
          <CommonInput
            label={renderFieldLabel(
              <User className="w-4 h-4 text-gray-500" />,
              "Name",
              true
            )}
            required={true}
            type="text"
            name="name"
            value={data.name || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter full name"
            autoComplete="name"
          />

          {/* Mobile Number */}
          <CommonInput
            label={renderFieldLabel(
              <Phone className="w-4 h-4 text-gray-500" />,
              "Mobile Number",
              true
            )}
            required={true}
            type="tel"
            name="mobileNumber"
            value={data.mobileNumber || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter mobile number"
            autoComplete="tel"
          />

          {/* Email */}
          <CommonInput
            type="email"
            name="email"
            className="border-inherit"
            placeholder="Enter email address"
            autoComplete="email"
            label={
              <div className="flex gap-2 text-sm items-center font-medium text-gray-700 mb-2">
                <span className="text-lg">{icons["mail"]}</span>
                Email
              </div>
            }
            value={data.email || ""}
            onChange={handleInputChange}
          />

          {/* Source */}
          <CommonSelect
            label={renderFieldLabel(
              <Target className="w-4 h-4 text-gray-500" />,
              "Source"
            )}
            options={SOURCE_OPTIONS}
            name="source"
            value={data.source || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Select source"
          />

          {/* Status */}
          <CommonSelect
            label="Status"
            name="status"
            value={data.status || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            options={STATUS_OPTIONS}
            placeholder="Select status"
          />

          {/* Assigned To */}
          <div className="flex flex-col justify-start w-full border-inherit">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 text-gray-500" />
              Assign To
            </label>
            <select
              name="assignedTo"
              value={data.assignedTo?._id || data.assignedTo || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-inherit rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={agentsLoading}
            >
              <option value="">
                {agentsLoading ? "Loading agents..." : "Select user"}
              </option>
              {agentOptions.map((agent) => (
                <option key={agent.value} value={agent.value}>
                  {agent.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Property Requirements Section */}
        <div className="space-y-4 text-start border-inherit">
          <h2 className="block text-lg font-medium text-gray-700 mb-3 border-b border-gray-200 pb-2">
            Property Requirements
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 border-inherit">
            {/* Property Type */}
            <CommonSelect
              label="Property Type"
              name="propertyRequirement.type"
              value={data.propertyRequirement?.type || ""}
              onChange={handleInputChange}
              options={PROPERTY_TYPES}
              placeholder="Select property type"
            />

            {/* Looking For */}
            <CommonSelect
              label="Looking For"
              name="propertyRequirement.lookingFor"
              value={data.propertyRequirement?.lookingFor || ""}
              onChange={handleInputChange}
              options={LOOKING_FOR_OPTIONS}
              placeholder="Select option"
            />

            {/* Category */}
            <CommonInput
              label="Category"
              name="propertyRequirement.category"
              value={data.propertyRequirement?.category || ""}
              onChange={handleInputChange}
              placeholder="e.g. 2BHK, Office, Shop"
            />

            {/* Budget Min */}
            <CommonInput
              label="Min Budget (₹)"
              type="number"
              name="propertyRequirement.budgetMin"
              value={data.propertyRequirement?.budgetMin || ""}
              onChange={handleInputChange}
              placeholder="Minimum budget"
              min="0"
            />

            {/* Budget Max */}
            <CommonInput
              label="Max Budget (₹)"
              type="number"
              name="propertyRequirement.budgetMax"
              value={data.propertyRequirement?.budgetMax || ""}
              onChange={handleInputChange}
              placeholder="Maximum budget"
              min="0"
            />

            {/* Size */}
            <CommonInput
              label="Size"
              name="propertyRequirement.size"
              value={data.propertyRequirement?.size || ""}
              onChange={handleInputChange}
              placeholder="e.g. 1200 sq ft, 3BHK"
            />
          </div>

          {/* Location Preference - Full Width */}
          <div className="w-full border-inherit">
            <CommonInput
              label="Location Preference"
              name="propertyRequirement.locationPreference"
              value={(data.propertyRequirement?.locationPreference || []).join(
                ", "
              )}
              onChange={handleLocationChange}
              placeholder="Enter locations separated by commas (e.g., Downtown, Suburbs, Near Metro)"
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate multiple locations with commas
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading || !data.name || !data.mobileNumber}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Lead"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadFormModel;
