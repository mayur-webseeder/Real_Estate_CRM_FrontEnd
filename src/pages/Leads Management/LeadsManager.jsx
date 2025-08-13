import { Link, Outlet } from "react-router";
import AddFollowUp from "./AddFollowUp";
function LeadsManager() {
  return (
    <div className="w-full h-full border-inherit">
      <Outlet />
      <AddFollowUp />
    </div>
  );
}

export default LeadsManager;
