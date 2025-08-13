import React, { useState } from "react";
import SideNavBtn from "../components/buttons/SideNavBtn";

function LinkDropDown({ link, isOpen }) {
  const [expand, setExpand] = useState(false);
  return (
    <div>
      <SideNavBtn
        className={"text-nowrap  w-full "}
        {...link}
        hideText={isOpen}
        action={() => setExpand((prv) => !prv)}
      />
      {expand && (
        <div className="">
          {link?.chidrens?.map((sublk) => {
            return (
              <SideNavBtn
                key={JSON.stringify(sublk)}
                className={"text-nowrap w-fit"}
                {...sublk}
                hideText={isOpen}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LinkDropDown;
