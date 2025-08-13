import { Link, NavLink } from "react-router";
import useIcon from "../../hooks/useIcon";

function SideNavBtn({ action, stub, icon, text, className, hideText, state }) {
  const icons = useIcon();
  return (
    <NavLink
      className={({ isActive }) =>
        ` ${
          isActive ? "opacity-100" : "opacity-50"
        } flex justify-start items-center gap-3  hover:opacity-100 hover:bg-black/10 rounded-lg p-2 ${className}`
      }
      aria-label={`${text}-side-nav-link`}
      to={stub}
      onClick={action}
      state={state}
    >
      <span>{icons[icon]}</span>
      {hideText && <span>{text}</span>}
    </NavLink>
  );
}

export default SideNavBtn;
