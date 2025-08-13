import { Routes, Route } from "react-router";
import Dashboard from "../pages/Dashboard";
import LeadsManager from "../pages/Leads Management/LeadsManager";
import PropertyManager from "../pages/Property Management /PropertyManager";
import TeamManager from "../pages/Team Management/TeamManager";
import ProtectedRoute from "../components/utils/ProtectedRoute";
import AddLead from "../pages/Leads Management/AddNewLead";
import Login from "../pages/Auth/Login";
import CompanyRegistration from "../pages/Auth/CompanyRegistration";
import UserTable from "../pages/Team Management/UserTable";
import Layout from "../layout/Layout";
import AddNewUser from "../pages/Team Management/AddNewUser";
import PropertyTabel from "../pages/Property Management /PropertyTabel";
import AddProperty from "../pages/Property Management /AddProperty";
import UserProfile from "../pages/Auth/UserProfile";
import LeadProfile from "../pages/Leads Management/LeadProfile";
import DisposedLeadsList from "../pages/Leads Management/DiposedLeadsList";
import LeadsList from "../pages/Leads Management/LeadsList";
import EditLead from "../pages/Leads Management/EditLead";

function Router() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />
      <Route path="/company/register" element={<CompanyRegistration />} />

      {/* Protected Routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="leads_management"
          element={
            <ProtectedRoute>
              <LeadsManager />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <LeadsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="disposed/leads"
            element={
              <ProtectedRoute>
                <DisposedLeadsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="add_leads"
            element={
              <ProtectedRoute>
                <AddLead />
              </ProtectedRoute>
            }
          />
          <Route
            path="edit_leads"
            element={
              <ProtectedRoute>
                <EditLead />
              </ProtectedRoute>
            }
          />
          <Route
            path="lead/profile/:leadId"
            element={
              <ProtectedRoute>
                <LeadProfile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="property_management"
          element={
            <ProtectedRoute>
              <PropertyManager />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <PropertyTabel />
              </ProtectedRoute>
            }
          />
          <Route
            path="add_property"
            element={
              <ProtectedRoute>
                <AddProperty />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="team_management"
          element={
            <ProtectedRoute>
              <TeamManager />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <UserTable />
              </ProtectedRoute>
            }
          />
          <Route
            path="add_user"
            element={
              <ProtectedRoute>
                <AddNewUser />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
