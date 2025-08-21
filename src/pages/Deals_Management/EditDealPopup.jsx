import React, { useState, useEffect } from "react";
import { DEAL_STAGES } from "../../constant/deals";
import CommonInput from "../../components/input/CommonInput";
import CommonBtn from "../../components/buttons/CommonBtn";

export default function EditDealPopup({ deal, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    stage: "",
    expectedValue: "",
    finalValue: "",
    expectedCloseDate: "",
    actualCloseDate: "",
    notes: "",
  });

  // Pre-fill data when popup opens
  useEffect(() => {
    if (deal) {
      setFormData({
        stage: deal.stage || "qualification",
        expectedValue: deal.expectedValue || "",
        finalValue: deal.finalValue || "",
        expectedCloseDate: deal.expectedCloseDate
          ? deal.expectedCloseDate.split("T")[0]
          : "",
        actualCloseDate: deal.actualCloseDate
          ? deal.actualCloseDate.split("T")[0]
          : "",
        notes: deal.notes || "",
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // pass data to parent for API call
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Deal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stage */}
          {/* <div>
            <label className="block text-sm font-medium">Stage</label>
            <select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              {DEAL_STAGES.map((stage) => (
                <option key={stage} value={stage}>
                  {stage.replaceAll("_", " ")}
                </option>
              ))}
            </select>
          </div> */}

          {/* Expected Value */}

          <CommonInput
            label={"Expected Value"}
            type="number"
            name="expectedValue"
            value={formData.expectedValue}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Final Value */}

          <CommonInput
            label={"Final Value"}
            type="number"
            name="finalValue"
            value={formData.finalValue}
            onChange={handleChange}
          />

          {/* Dates */}

          <CommonInput
            label={"Expected Close Date"}
            type="date"
            name="expectedCloseDate"
            value={formData.expectedCloseDate}
            onChange={handleChange}
          />
          <CommonInput
            label={"Actual Close Date"}
            type="date"
            name="actualCloseDate"
            value={formData.actualCloseDate}
            onChange={handleChange}
          />

          {/* Notes */}

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <CommonBtn
              type="button"
              action={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </CommonBtn>
            <CommonBtn
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Save
            </CommonBtn>
          </div>
        </form>
      </div>
    </div>
  );
}
