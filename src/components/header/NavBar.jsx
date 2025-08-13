import { useSelector } from "react-redux";
import Brand from "../brand/Brand";
import Avatar from "../imageComp/Avatar";
import ProfileMenuBox from "../menus/ProfileMenuBox";
import { useLocation } from "react-router";

function NavBar() {
  const { isLogin } = useSelector((state) => state.auth);
  const { state } = useLocation();
  return (
    <header className="w-full h-16 ">
      <nav className="flex justify-between items-center w-full h-full ">
        <div className="p-2">
          {state?.activeSection && (
            <h1 className="text-2xl">{state?.activeSection}</h1>
          )}
        </div>{" "}
        {isLogin && <ProfileMenuBox />}
      </nav>
    </header>
  );
}

export default NavBar;
