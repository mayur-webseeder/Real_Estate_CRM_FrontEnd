import {
  MdDewPoint,
  MdHelpCenter,
  MdHelpOutline,
  MdHome,
  MdLogout,
  MdMail,
  MdMailOutline,
  MdMessage,
  MdOutlineMoveDown,
  MdOutlineMoveUp,
  MdOutlineSettings,
  MdOutlineSupportAgent,
  MdSettings,
  MdSpaceDashboard,
} from "react-icons/md";
import {
  FaBell,
  FaLandmark,
  FaLocationPin,
  FaMapPin,
  FaUser,
  FaUsers,
  FaUsersLine,
} from "react-icons/fa6";
import {
  BsBell,
  BsDot,
  BsEye,
  BsLayoutTextSidebarReverse,
  BsPhone,
  BsSave,
  BsShield,
} from "react-icons/bs";
import { LuDot, LuPointer, LuUser, LuUserPlus } from "react-icons/lu";
import { FiEyeOff, FiMapPin, FiTrendingUp, FiUser } from "react-icons/fi";
import { MdContactEmergency, MdDeleteOutline } from "react-icons/md";
import { RiChatFollowUpLine } from "react-icons/ri";
import { CircleDot } from "lucide-react";
import { RxCrumpledPaper } from "react-icons/rx";
const useIcon = () => {
  return {
    // A
    // --
    agent: <MdOutlineSupportAgent />,
    // B
    bell: <BsBell />,

    // C
    contact: <MdContactEmergency />,

    // D
    // --
    dashboardFi: <MdSpaceDashboard />,
    delete: <MdDeleteOutline />,
    disposeIn: <MdOutlineMoveDown />,
    disposeOut: <MdOutlineMoveUp />,

    // E
    eyeOff: <FiEyeOff />,
    eye: <BsEye />,

    // F
    followup: <RiChatFollowUpLine />,

    // G
    // --

    // H
    home: <MdHome className="w-8 h-8 text-white" />,
    helpCircle: <MdHelpOutline />,
    // I
    // --

    // J
    // --

    // K
    // --

    // L
    // --
    leads: <FaUsers />,
    logout: <MdLogout />,
    location: <FiMapPin />,

    // M
    mail: <MdMailOutline />,

    // N
    // --

    // O
    // --

    // P
    property: <FaLandmark />,
    point: <LuDot />,
    phone: <BsPhone />,
    // Q
    // --

    // R
    // --

    // S
    sidebar: <BsLayoutTextSidebarReverse />,
    settings: <MdOutlineSettings />,
    shield: <BsShield />,
    save: <BsSave />,

    // T
    trendingUp: <FiTrendingUp />,

    // U
    user: <FiUser />,
    userPlus: <LuUserPlus />,

    // V
    // --

    // W
    // --

    // X
    // --

    // Y
    // --

    // Z
    // --
  };
};

export default useIcon;
