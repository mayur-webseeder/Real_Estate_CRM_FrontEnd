import React, { useEffect, useMemo } from "react";
import TableFrame from "../../components/table/TableFrame";
import TableRow from "../../components/table/TableRow";
import useLeadsService from "../../services/useLeadsService";
import PaginationControls from "../../components/table/PaginationControls";
import { useDispatch, useSelector } from "react-redux";
import {
  setFollowupOpen,
  setLeadId,
  setLeadPage,
} from "../../store/leadsSlice";
import TableCell from "../../components/table/TableCell";
import LinkBtn from "../../components/buttons/LinkBtn";
import CommonBtn from "../../components/buttons/CommonBtn";
import useIcon from "../../hooks/useIcon";
import AddFollowUpPopup from "./AddFollowUp";
import { useLocation } from "react-router";
function LeadsList() {
  const { fetchLeads, toggelDisposeLead } = useLeadsService();
  const { leads, search, page, limit, totalPages } = useSelector(
    (state) => state.leads
  );
  const dispatch = useDispatch();
  const icons = useIcon();
  const leadsColumn = useMemo(
    () => [
      { title: <input type="checkbox" />, key: "selector" },
      { title: "Name", key: "name" },
      { title: "Mobile Number", key: "mobileNumber" },
      { title: "email", key: "email" },
      { title: "source", key: "source" },
      { title: "status", key: "status" },
      // { title: "interestedIn", key: "interestedIn" },
      { title: "assignedTo", key: "assignedTo" },
      { title: "Action", key: "action" },
    ],
    []
  );
  const handelPrevPage = () => {
    if (page > 1) dispatch(setLeadPage(page - 1));
  };
  const handelNextPage = () => {
    if (page < totalPages) dispatch(setLeadPage(page + 1));
  };
  useEffect(() => {
    fetchLeads();
  }, []);

  const handleAddFolloup = (id) => {
    dispatch(setFollowupOpen());
    dispatch(setLeadId(id));
  };
  const handelDisposeLead = (id, isDispose) => {
    toggelDisposeLead({ id, isDispose });
  };
  return (
    <div className=" space-y-3 w-full border-inherit">
      <div className="rounded-lg border  p-6 mb-6 border-inherit">
        <div className="flex items-center gap-3">
          <div className="w-full text-start">
            <h2 className="text-xl font-medium text-gray-900">
              Total {leads?.length} leads found{" "}
            </h2>
            <div className="flex justify-center items-center gap-5"></div>
          </div>
        </div>
      </div>
      <div className="w-full border-inherit space-y-6">
        <div className="w-full overflow-auto border-inherit text-nowrap">
          <TableFrame className="border rounded-lg" columns={leadsColumn}>
            {leads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>
                  <input type="checkbox" />
                </TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.mobileNumber}</TableCell>
                <TableCell>{lead.email}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.status}</TableCell>
                {/* <TableCell>{lead?.intrestedIn?.join(",")}</TableCell> */}
                <TableCell>{lead?.assignedTo?.userName}</TableCell>
                <TableCell>
                  <div className="flex justify-center items-center gap-2 text-sm">
                    <LinkBtn
                      stub={`lead/profile/${lead?._id}`}
                      className={"text-gray-500 w-fit"}
                      title="view profile"
                    >
                      {icons["eye"]}
                    </LinkBtn>

                    <CommonBtn
                      action={() => handleAddFolloup(lead._id)}
                      className={"text-gray-500 w-fit"}
                      tooltip="add followup"
                    >
                      {icons["followup"]}
                    </CommonBtn>
                    <CommonBtn
                      action={() => handelDisposeLead(lead._id, lead.isDispose)}
                      className={"text-red-500 w-fit rounded-lg"}
                      tooltip="dispose"
                    >
                      {icons["disposeIn"]}
                    </CommonBtn>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableFrame>
        </div>
        <PaginationControls
          className={" justify-end w-full "}
          page={page}
          totalPages={totalPages}
          onNext={handelNextPage}
          onPrev={handelPrevPage}
        />
      </div>
      <AddFollowUpPopup />
    </div>
  );
}

export default LeadsList;
