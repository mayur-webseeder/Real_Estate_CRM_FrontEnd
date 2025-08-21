import {
  MdClose,
  MdHelpOutline,
  MdHome,
  MdLogout,
  MdMailOutline,
  MdOutlineDateRange,
  MdOutlineMoveDown,
  MdOutlineMoveUp,
  MdOutlineSettings,
  MdOutlineSupportAgent,
  MdSpaceDashboard,
  MdUnarchive,
} from "react-icons/md";
import { FaLandmark, FaUsers, FaSpinner, FaIdeal } from "react-icons/fa6";
import {
  BsArchive,
  BsBell,
  BsEye,
  BsLayoutTextSidebarReverse,
  BsPhone,
  BsPlus,
  BsSave,
  BsShield,
} from "react-icons/bs";
import { LuDot, LuUserPlus } from "react-icons/lu";
import {
  FiEdit,
  FiEyeOff,
  FiFileText,
  FiMapPin,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { MdContactEmergency, MdDeleteOutline } from "react-icons/md";
import { RiChatFollowUpLine } from "react-icons/ri";
import { LuCloudUpload } from "react-icons/lu";
import { ImClock, ImSpinner6 } from "react-icons/im";
import { TbArchive, TbArchiveOff } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { RiDragDropLine } from "react-icons/ri";
const useIcon = () => {
  return {
    // A
    agent: <MdOutlineSupportAgent />,
    archive: <TbArchive />,
    unarchive: <TbArchiveOff />,
    // B
    bell: <BsBell />,

    // C
    contact: <MdContactEmergency />,
    close: <MdClose />,
    clock: <ImClock />,
    calender: <MdOutlineDateRange />,
    // D

    dashboardFi: <MdSpaceDashboard />,
    delete: <MdDeleteOutline />,
    disposeIn: <MdOutlineMoveDown />,
    disposeOut: <MdOutlineMoveUp />,
    deal: <FaIdeal />,
    drag: <RiDragDropLine />,

    // E
    eyeOff: <FiEyeOff />,
    eye: <BsEye />,
    edit: <CiEdit />,

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
    note: <FiFileText />,

    // O
    // --

    // P
    property: <FaLandmark />,
    point: <LuDot />,
    phone: <BsPhone />,
    plus: <BsPlus />,
    // Q
    // --

    // R
    // --

    // S
    sidebar: <BsLayoutTextSidebarReverse />,
    settings: <MdOutlineSettings />,
    shield: <BsShield />,
    save: <BsSave />,
    spinner1: <FaSpinner className=" animate-spin" />,
    spinner2: <ImSpinner6 className=" animate-spin" />,

    // T
    trendingUp: <FiTrendingUp />,

    // U
    user: <FiUser />,
    userPlus: <LuUserPlus />,
    upload: <LuCloudUpload />,

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
