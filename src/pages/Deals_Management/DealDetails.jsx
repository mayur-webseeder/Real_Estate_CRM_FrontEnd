import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import ConfirmationBox from "../../components/utils/ConfirmationBox";

import LinkBtn from "../../components/buttons/LinkBtn";
import SaveBtn from "../../components/buttons/SaveBtn";
import CancelBtn from "../../components/buttons/CancelBtn";
import { useParams } from "react-router";
import useDealsService from "../../services/useDealsService";
import CommonHeader from "../../components/header/CommonHeader";
import WrapperContainer from "../../components/WrapperContainer";

const DealDetails = () => {
  const { dealId } = useParams();
  const isLoading = useSelector((state) => state.deals.isLoading);
  const deal = useSelector((state) => state.deals.deal);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState({
    status: false,
    data: {},
  });
  const { fetchDealDetails } = useDealsService();

  // Fetch deal details
  useEffect(() => {
    fetchDealDetails(dealId);
  }, [dealId]);

  if (isLoading) return <p className="text-center">Loading deal details...</p>;

  const isClosed =
    deal?.stage === "closed_won" || deal?.stage === "closed_lost";

  return (
    <div className=" text-start border-inherit">
      <CommonHeader title={"Deal Details"} />
      <WrapperContainer className={"p-6"}>
        <div className="space-y-4 border-inherit">
          {/* Deal Info */}
          <div className="grid grid-cols-2 gap-4">
            <p>
              <strong>Lead:</strong> {deal?.lead?.name}
            </p>
            <p>
              <strong>Property:</strong> {deal?.property?.title}
            </p>
            <p>
              <strong>Agent:</strong> {deal?.assignedTo?.name}
            </p>
            <p>
              <strong>Stage:</strong> {deal?.stage}
            </p>
            <p>
              <strong>Expected Value:</strong> {deal?.expectedValue || "-"}
            </p>
            <p>
              <strong>Final Value:</strong> {deal?.finalValue || "-"}
            </p>
            <p>
              <strong>Expected Close:</strong>{" "}
              {deal?.expectedCloseDate
                ? new Date(deal?.expectedCloseDate).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <strong>Actual Close:</strong>{" "}
              {deal?.actualCloseDate
                ? new Date(deal.actualCloseDate).toLocaleDateString()
                : "-"}
            </p>
          </div>

          <div className="border-inherit">
            <strong>Notes:</strong>
            <p className=" p-2 border rounded-md text-wrap border-inherit">
              {deal?.notes || "No notes added"}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 mt-6">
            {!isClosed && <SaveBtn onClick={() => {}}>Edit Deal</SaveBtn>}
            {isClosed && (
              <LinkBtn stub={`/deals_management/deal/${dealId}/reopen`}>
                Reopen Deal
              </LinkBtn>
            )}
          </div>
        </div>
      </WrapperContainer>
    </div>
  );
};

export default DealDetails;
