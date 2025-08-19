import { useEffect } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Users,
  Star,
  Plus,
  Clock,
  Edit2,
} from "lucide-react";
import { getStageColor } from "../../utils/getStageColor";
import { getStatusColor } from "../../utils/getStatusColor";
import { useNavigate, useParams } from "react-router";
import useFolloupsService from "../../services/useFolloupsService";
import { useDispatch, useSelector } from "react-redux";
import { setLeadsFormData } from "../../store/leadsSlice";
import CommonBtn from "../../components/buttons/CommonBtn";
import LinkBtn from "../../components/buttons/LinkBtn";
import useLeadsService from "../../services/useLeadsService";
import { formatDate } from "../../utils/formatedDate";
import useIcon from "../../hooks/useIcon";

const LeadsProfile = () => {
  const { leadFolloups, lead } = useSelector((state) => state.leads);
  const { logedInUser } = useSelector((state) => state.auth);
  const { getFolloupsByLeadId } = useFolloupsService();
  const { fetchLeadById } = useLeadsService();
  const { leadId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const icons = useIcon();
  useEffect(() => {
    if (leadId) {
      getFolloupsByLeadId(leadId);
      fetchLeadById(leadId);
    }
  }, [leadId]);

  const handleAddFolloup = (id) => {
    navigate("/leads_management/followup/" + id);
  };

  return (
    <div className="mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex text-start items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {lead?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead?.name}</h1>
            <p className="text-gray-600">
              Lead ID: {lead?._id?.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <div>
          {" "}
          <LinkBtn
            stub={"/leads_management/edit_leads"}
            action={() => dispatch(setLeadsFormData(lead))}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </LinkBtn>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
              <div className="flex justify-start items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Mobile</p>
                  <p className="font-medium text-gray-900">
                    {lead?.mobileNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{lead?.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-3 text-start">
              <MapPin className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Source</p>
                <p className="font-medium text-gray-900">{lead?.source}</p>
              </div>
            </div>
          </div>

          {/* Interested Properties */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
              Interested Properties
            </h2>

            <div className="space-y-3">
              {lead?.interestedIn?.map((property) => (
                <div
                  key={property._id}
                  className="bg-white rounded-lg p-4 border border-gray-200 space-y-3"
                >
                  <div className="flex justify-between items-start ">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {property.title}
                      </h3>
                      <p className="text-sm text-gray-600">{property.type}</p>
                    </div>
                    <span className="text-lg font-bold text-green-600">
                      {property.price}
                    </span>
                  </div>
                  <div className="flex justify-end items-center w-full ">
                    <LinkBtn
                      stub={`/deals_management/create_deal/${leadId}/${property._id}`}
                      className={
                        "flex items-center gap-2 text-blue-600 w-fit p-2"
                      }
                    >
                      {icons["deal"]} Create deal
                    </LinkBtn>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Followups */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-3" />
              Follow-ups
            </h2>

            <div className="space-y-4">
              <CommonBtn
                action={() => handleAddFolloup(lead._id)}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Schedule New Follow-up
              </CommonBtn>
              {leadFolloups?.map((folloup) => (
                <div
                  key={folloup._id}
                  className="bg-gradient-to-r from-white to-gray-50/50 rounded-xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:border-orange-200"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900">
                        {folloup.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {folloup.status}
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {folloup.priority}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Follow-up Date:</span>{" "}
                        {formatDate(folloup.followupsDate)}
                      </div>
                      <div>
                        <span className="font-medium">Reminder:</span>{" "}
                        {folloup.reminderSent ? "Sent" : "Pending"}
                      </div>
                    </div>
                    {folloup.description && (
                      <p className="text-gray-700 bg-gray-50 rounded-lg p-3">
                        {folloup.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Next Followup */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Star className="w-6 h-6 mr-3" />
              Next Follow-up
            </h2>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-blue-100 text-sm mb-2">Scheduled for</p>
              <p className="text-white font-bold text-lg">
                No upcoming follow-ups
              </p>
            </div>
          </div>

          {/* Status & Stage */}
          <div className="flex flex-col justify-center items-start bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-blue-600" />
              Status & Stage
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-500">Current Stage</label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStageColor(
                    lead?.stage
                  )}`}
                >
                  {lead?.stage?.replace("_", " ")}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-500">Status</label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                    lead?.status
                  )}`}
                >
                  {lead?.status?.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Agent */}
          {logedInUser?.role == "agent" && (
            <div className="bg-gray-50 rounded-xl p-6 text-start">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Assigned Agent
              </h2>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {lead?.assignedTo?.userName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {lead?.assignedTo?.userName}
                  </p>
                  <p className="text-sm text-gray-600">
                    {lead?.assignedTo?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-gray-50 rounded-xl p-6 text-start">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-600" />
              Timeline
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Created</p>
                  <p className="text-xs text-gray-600">
                    {formatDate(lead?.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Last Updated
                  </p>
                  <p className="text-xs text-gray-600">
                    {formatDate(lead?.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsProfile;
