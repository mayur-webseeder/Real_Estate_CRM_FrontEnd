import { Outlet, useLocation } from "react-router";
import CommonHeader from "../../components/header/CommonHeader";

import Breadcrumb from "../../components/utils/BreadCrumb";
function FollowupsDashboard() {
  const breadcrumbItems = [
    { label: "All", path: "/followups_management" },
    { label: "Todays", path: "/followups_management/todays" },
    { label: "Upcomming", path: "/followups_management/upcomming" },
    { label: "Analytics", path: "/followups_management/analytics" },
  ];

  return (
    <div className="border-inherit space-y-4">
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <CommonHeader
        title={` Follow-ups Dashboard`}
        className={"flex justify-between w-full"}
      >
        <div></div>
      </CommonHeader>
      <div className="space-y-4 border-inherit">
        <Outlet />
      </div>
    </div>
  );
}

export default FollowupsDashboard;
