import { useEffect, useState } from "react";
import useIcon from "../hooks/useIcon";

import LinkDropDown from "./LinkDropDown";
import LogoutBtn from "../components/buttons/Auth/LogoutBtn";
import CommonBtn from "../components/buttons/CommonBtn";
import Brand from "../components/brand/Brand";

const links = [
  {
    icon: "dashboardFi",
    stub: "/",
    text: "Dashboard",
  },
  {
    icon: "leads",
    stub: "/leads_management",
    text: "Leads Managment",
    state: { activeSection: "Leads Managment" },
    chidrens: [
      {
        icon: "point",
        stub: "/leads_management/add_leads",
        text: "Add Leads ",
      },
      {
        icon: "point",
        stub: "/leads_management/disposed/leads",
        text: "Disposed Leads ",
      },
    ],
  },
  {
    icon: "property",
    stub: "/property_management",
    text: "Property Managment",
    chidrens: [
      {
        icon: "point",
        stub: "/property_management/add_property",
        text: "Add Property",
      },
    ],
    state: { activeSection: "Property Managment" },
  },
  {
    icon: "agent",
    stub: "/team_management",
    text: "Team Managment",
    chidrens: [
      { icon: "point", stub: "/team_management/add_user", text: "Add user" },
    ],
    state: { activeSection: "Agent Managment" },
  },
  {
    icon: "contact",
    stub: "/followups_management",
    text: "FollowUps Managment",
    // chidrens: [{ stub: "/agent_management/add_agent", text: "Add Agent" }],
    state: { activeSection: "FollowUps Managment" },
  },
];

function SideBar() {
  const icons = useIcon();

  const [isOpen, setOpen] = useState(() => {
    // Remove localStorage for Claude.ai compatibility
    return true;
  });

  const handlExpantion = () => {
    setOpen((prev) => !prev);
  };

  return (
    <aside
      className={`flex flex-col justify-between bg-gradient-to-b text-white from-indigo-950 via-blue-900 to-slate-900 shadow-2xl border-r border-blue-500/30 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isOpen ? "min-w-[280px] w-[280px]" : "w-[72px]"
      } h-full relative overflow-hidden`}
    >
      {/* Vibrant gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-blue-500/5 to-indigo-600/8 pointer-events-none"></div>

      {/* Header with improved styling */}
      <header className="relative group flex justify-between items-center h-20 px-4 border-b border-blue-400/30 bg-indigo-900/60">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            !isOpen ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <Brand />
        </div>
        <div
          className={`transition-all duration-200 ${
            !isOpen && "group-hover:scale-110"
          }`}
        >
          <CommonBtn
            action={handlExpantion}
            className={`p-2 rounded-lg bg-blue-600/40 hover:bg-blue-500/60 transition-all duration-200 backdrop-blur-sm border border-cyan-400/40 hover:border-cyan-300/70 shadow-lg hover:shadow-cyan-500/20 ${
              isOpen
                ? "hover:cursor-w-resize shadow-lg"
                : "cursor-e-resize hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {icons["sidebar"]}
          </CommonBtn>
        </div>
      </header>

      {/* Navigation section with enhanced styling */}
      <section className="flex-1 py-6 px-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/70 scrollbar-track-transparent">
        <nav>
          <ul className="flex flex-col gap-2 w-full">
            {links.map((link, index) => (
              <li
                key={JSON.stringify(link)}
                className={`transition-all duration-300 ease-in-out ${
                  !isOpen && "hover:scale-105"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <LinkDropDown link={link} isOpen={isOpen} />
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* Footer with improved styling */}
      <footer className="p-4 border-t border-blue-400/30 bg-indigo-900/40 backdrop-blur-sm">
        <div
          className={`transition-all duration-300 ${
            !isOpen && "flex justify-center"
          }`}
        >
          <LogoutBtn
            className={`transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
              isOpen ? "w-full" : "w-auto"
            }`}
            hideText={isOpen}
          />
        </div>
      </footer>

      {/* Subtle border accent */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-teal-500/40 to-emerald-500/40"></div>
    </aside>
  );
}

export default SideBar;
