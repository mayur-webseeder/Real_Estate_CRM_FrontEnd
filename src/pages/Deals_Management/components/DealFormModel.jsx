import React, { useState } from "react";
import CommonSelect from "../../../components/input/CommonSelect";
import CommonInput from "../../../components/input/CommonInput";
import useIcon from "../../../hooks/useIcon";
import { FileText } from "lucide-react";
import { useSelector } from "react-redux";
const DealFormModel = ({ leadId, propertyId, onSubmit }) => {
  const { isDealSubmitting } = useSelector((state) => state.deals);
  const [formData, setFormData] = useState({
    leadId: leadId || "",
    propertyId: propertyId || "",
    stage: "qualification",
    expectedValue: "",
    expectedCloseDate: "",
    notes: "",
  });
  const icons = useIcon();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  const DEAL_STAGES = [
    "contacted",
    "qualification",
    "site_visit_scheduled",
    "negotiation",
    "proposal_sent",
    "closed_won",
    "closed_lost",
  ];

  const stageOptions = [
    { value: "contacted", label: "Contacted", color: "text-blue-500" },
    { value: "qualification", label: "Qualification", color: "text-gray-600" },
    {
      value: "site_visit_scheduled",
      label: "Site Visit Scheduled",
      color: "text-blue-600",
    },
    { value: "negotiation", label: "Negotiation", color: "text-yellow-600" },
    {
      value: "proposal_sent",
      label: "Proposal Sent",
      color: "text-purple-600",
    },
    { value: "closed_won", label: "Closed Won", color: "text-green-600" },
    { value: "closed_lost", label: "Closed Lost", color: "text-red-600" },
  ];

  const getStageInfo = (stage) => {
    return (
      stageOptions.find((option) => option.value === stage) || stageOptions[0]
    );
  };

  return (
    <div className="">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          {icons["deal"]}
          Add New Deal
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Create a new deal to track progress and close opportunities
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Hidden fields */}
        <CommonInput type="hidden" name="leadId" value={formData.leadId} />
        <CommonInput
          type="hidden"
          name="propertyId"
          value={formData.propertyId}
        />

        {/* Stage with visual indicator */}
        <div>
          <div className="relative">
            <CommonSelect
              label={"Deal Stage"}
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg  transition-colors appearance-none bg-white"
              options={stageOptions}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <div
                className={`w-2 h-2 rounded-full ${getStageInfo(
                  formData.stage
                ).color.replace("text-", "bg-")}`}
              ></div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Current stage:{" "}
            <span
              className={`font-medium ${getStageInfo(formData.stage).color}`}
            >
              {getStageInfo(formData.stage).label}
            </span>
          </p>
        </div>

        {/* Expected Value */}
        <CommonInput
          label={"Expected Value"}
          type="number"
          name="expectedValue"
          value={formData.expectedValue}
          onChange={handleChange}
          placeholder="Enter deal value"
          className="w-full pr-4 py-3 border border-gray-300 rounded-lg transition-colors"
        />

        {/* Expected Close Date */}
        <CommonInput
          label={"  Expected Close Date"}
          type="date"
          name="expectedCloseDate"
          value={formData.expectedCloseDate}
          onChange={handleChange}
          className="w-full pr-4 py-3 border border-gray-300 rounded-lg "
        />

        {/* Notes */}
        <div>
          <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center">
            {icons["note"]}
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add any additional information about this deal..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg  resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: Add context, requirements, or special considerations
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isDealSubmitting}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium flex items-center justify-center"
          >
            {isDealSubmitting ? (
              <>
                {icons["spinner1"]}
                Creating Deal...
              </>
            ) : (
              "Create Deal"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DealFormModel;
