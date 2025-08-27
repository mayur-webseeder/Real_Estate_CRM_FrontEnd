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
import AddProperty from "../pages/Property Management /AddProperty";
import UserProfile from "../pages/Auth/UserProfile";
import LeadProfile from "../pages/Leads Management/LeadProfile";
import DisposedLeadsList from "../pages/Leads Management/DiposedLeadsList";
import LeadsList from "../pages/Leads Management/LeadsList";
import EditLead from "../pages/Leads Management/EditLead";
import AddFollowUp from "../pages/Followups_management/AddFollowUp";
import PropertyDetails from "../pages/Property Management /PropertyDetails";
import PropertyList from "../pages/Property Management /PropertiesList";
import ArchivedProperties from "../pages/Property Management /ArchivedProperties";
import EditProperty from "../pages/Property Management /EditProperty";
import Deals_Manager from "../pages/Deals_Management/Deals_Manager";
import AddDeal from "../pages/Deals_Management/AddDeal";
import DealsKanbanBoard from "../pages/Deals_Management/DealsKanbanBoard";
import LeadExportImport from "../components/utils/LeadsBulkImport";
import FollowupsManager from "../pages/Followups_management/FollowupsManager";
import FollowupsDashboard from "../pages/Followups_management/FollowupsDashboard";
import ReopenDeal from "../pages/Deals_Management/components/ReopenDeal";
import DealDetails from "../pages/Deals_Management/DealDetails";
import FolloupsList from "../pages/Followups_management/FolloupsList";
import TodaysFolloups from "../pages/Followups_management/TodaysFolloups";
import UpcommingFollowups from "../pages/Followups_management/UpcommingFollowups";
import Analytics from "../pages/Followups_management/Analytics";
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
          <Route
            path="import"
            element={
              <ProtectedRoute>
                <LeadExportImport />
              </ProtectedRoute>
            }
          />
          <Route
            path="followup/:leadId"
            element={
              <ProtectedRoute>
                <AddFollowUp />
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
                <PropertyList />
              </ProtectedRoute>
            }
          />
          <Route
            path="archived_properties"
            element={
              <ProtectedRoute>
                <ArchivedProperties />
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
          />{" "}
          <Route
            path="edit_property"
            element={
              <ProtectedRoute>
                <EditProperty />
              </ProtectedRoute>
            }
          />
          <Route
            path="property/details/:propertyId"
            element={
              <ProtectedRoute>
                <PropertyDetails />
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
        <Route
          path="deals_management"
          element={
            <ProtectedRoute>
              <Deals_Manager />
            </ProtectedRoute>
          }
        >
          <Route
            path=""
            element={
              <ProtectedRoute>
                <DealsKanbanBoard />
              </ProtectedRoute>
            }
          />
          <Route
            path="create_deal/:leadId/:propertyId"
            element={
              <ProtectedRoute>
                <AddDeal />
              </ProtectedRoute>
            }
          />
          <Route
            path="deal/:dealId/details"
            element={
              <ProtectedRoute>
                <DealDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="deal/:dealId/reopen"
            element={
              <ProtectedRoute>
                <ReopenDeal />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="followups_management" element={<FollowupsManager />}>
          <Route
            path=""
            element={
              <ProtectedRoute>
                <FollowupsDashboard />
              </ProtectedRoute>
            }
          >
            {" "}
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <FolloupsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="todays"
              element={
                <ProtectedRoute>
                  <TodaysFolloups />
                </ProtectedRoute>
              }
            />
            <Route
              path="upcomming"
              element={
                <ProtectedRoute>
                  <UpcommingFollowups />
                </ProtectedRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default Router;
