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
  MdRefresh,
  MdSpaceDashboard,
  MdUnarchive,
} from "react-icons/md";
import {
  FaLandmark,
  FaUsers,
  FaSpinner,
  FaIdeal,
  FaDollarSign,
  FaRupeeSign,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa6";
import {
  BsArchive,
  BsArrowDown,
  BsArrowUp,
  BsBell,
  BsCurrencyRupee,
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
  FiMessageSquare,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { MdContactEmergency, MdDeleteOutline } from "react-icons/md";
import { RiChatFollowUpLine } from "react-icons/ri";
import { LuCloudUpload } from "react-icons/lu";
import { ImClock, ImInfo, ImSpinner6 } from "react-icons/im";
import { TbArchive, TbArchiveOff, TbUserDollar } from "react-icons/tb";
import { CiEdit } from "react-icons/ci";
import { RiDragDropLine } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GoIssueReopened } from "react-icons/go";
import { GrDocumentUpdate } from "react-icons/gr";
import { HiMiniLockClosed } from "react-icons/hi2";
const useIcon = () => {
  return {
    // A
    agent: <MdOutlineSupportAgent />,
    archive: <TbArchive />,
    unarchive: <TbArchiveOff />,
    arrowup: <IoIosArrowDown />,
    arrowdown: <IoIosArrowUp />,
    // B

    bell: <BsBell />,

    // C
    contact: <MdContactEmergency />,
    close: <MdClose />,
    clock: <ImClock />,
    calendar: <MdOutlineDateRange />,
    // D
    dashboardFi: <MdSpaceDashboard />,
    delete: <MdDeleteOutline />,
    disposeIn: <MdOutlineMoveDown />,
    disposeOut: <MdOutlineMoveUp />,
    deal: <FaIdeal />,
    drag: <RiDragDropLine />,
    dollar: <FaDollarSign />,

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
    info: <ImInfo />,

    // J
    // --

    // K
    // --

    // L
    // --
    leads: <FaUsers />,
    logout: <MdLogout />,
    location: <FiMapPin />,
    closed: <HiMiniLockClosed />,

    // M
    mail: <MdMailOutline />,
    messageSq: <FiMessageSquare />,

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
    rupee: <BsCurrencyRupee />,
    refresh: <MdRefresh />,
    reopened: <GoIssueReopened />,

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
    updated: <GrDocumentUpdate />,

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
