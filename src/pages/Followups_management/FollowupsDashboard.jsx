import { useState, useEffect } from "react";
import { CheckCircle, Trash2, Edit } from "lucide-react";
import axios from "axios";
import { formatDate } from "../../utils/formatedDate";
import CommonHeader from "../../components/header/CommonHeader";
import TableFrame from "../../components/table/TableFrame";
import WrapperContainer from "../../components/WrapperContainer";
import CommonSelect from "../../components/input/CommonSelect";
import PaginationControls from "../../components/table/PaginationControls";
import { useSelector } from "react-redux";
import useFolloupsService from "../../services/useFolloupsService";
import TableRow from "../../components/table/TableRow";
import TableCell from "../../components/table/TableCell";
import useIcon from "../../hooks/useIcon";
import CommonBtn from "../../components/buttons/CommonBtn";
function FollowupsDashboard() {
  const { followups, totalFollowupsPages, page, isFollowupsLoading, limit } =
    useSelector((state) => state.followups);
  const [filter, setFilter] = useState("all");
  const { fetchFollowups } = useFolloupsService();
  const icons = useIcon();
  useEffect(() => {
    fetchFollowups();
  }, []);

  const followupsColumns = [
    { title: "Lead", key: "lead.name" },
    {
      title: "Follow-up Date",
      key: "dueDate",
      render: (f) => formatDate(f.dueDate),
    },
    { title: "Notes", key: "notes" },
    { title: "Assigned To", key: "assignedTo.name" },
    {
      title: "Status",
      key: "status",
      render: (f) => (
        <span
          className={`px-2 py-1 rounded text-sm ${
            f.status === "done"
              ? "bg-green-100 text-green-700"
              : new Date(f.dueDate) < new Date()
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {f.status}
        </span>
      ),
    },
    { title: "Type", key: "type" },
    { title: "Priority", key: "priority" },

    {
      title: "Actions",
      key: "actions",
    },
  ];
  const handelPrevPage = () => {
    if (page > 1) dispatch(setLeadPage(page - 1));
  };
  const handelNextPage = () => {
    if (page < totalPages) dispatch(setLeadPage(page + 1));
  };

  return (
    <div className="p-6 space-y-4 border-inherit">
      {/* Header */}
      <CommonHeader title={"All Follow-ups"} />

      <div className="flex justify-between items-center border-inherit">
        <div className="bg-gradient-to-r from-blue-100 to-blue-50 px-4 py-2 rounded-lg text-blue-800 font-medium">
          Total of {followups.length} followups found
        </div>
        <div className="border-inherit">
          <CommonSelect
            className="border rounded p-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            options={[
              { value: "all", label: "All" },
              { value: "today", label: "Today" },
              { value: "overdue", label: "Overdue" },
              { value: "done", label: "Completed" },
            ]}
          />
        </div>
      </div>

      {/* Table using TableFrame */}
      <WrapperContainer>
        <TableFrame
          columns={followupsColumns}
          isLoading={isFollowupsLoading}
          emptyMessage="No folloups found"
        >
          {followups?.map((followup) => (
            <TableRow>
              <TableCell>{followup.lead.name}</TableCell>
              <TableCell>{followup.followupsDate}</TableCell>
              <TableCell>{followup.description}</TableCell>
              <TableCell>{followup.createdBy.userName}</TableCell>
              <TableCell>{followup.status}</TableCell>
              <TableCell>{followup.type}</TableCell>
              <TableCell>{followup.priority}</TableCell>
              <TableCell>
                {" "}
                <div className="flex gap-2">
                  {/* {f.status !== "done" && (
                    <button
                    //   onClick={() => markDone(f._id)}
                    >
                      <CheckCircle className="text-green-600" />
                    </button>
                  )} */}
                  <CommonBtn className={"text-blue-600"}>
                    {icons["edit"]}
                  </CommonBtn>
                  <CommonBtn className={"text-red-600"}>
                    {icons["delete"]}
                  </CommonBtn>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableFrame>
      </WrapperContainer>
      <PaginationControls
        className={"w-full flex justify-end"}
        onNext={handelNextPage}
        onPrev={handelPrevPage}
        page={page}
        totalPages={totalFollowupsPages}
      />
    </div>
  );
}

export default FollowupsDashboard;
