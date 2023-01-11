import React from "react";
import { Link } from "react-router-dom";
import StreamlineLogo from "./../../assets/images/logo/logo-dashboard.svg";
import StreamlineLogoSmall from "./../../assets/images/logo/logo-small.svg";
import SidebarMenu from "./menu";

const Sidebar = ({expendSidebar}) => {
  return (
    <div className={expendSidebar ? "block w-20 fixed md:left-0 top-0 bg-white min-h-screen xs:left-[-70px]" : "block w-52 fixed md:left-0 top-0 bg-white min-h-screen xs:left-[-210px]"}>
      <div className="block">
        <Link to="/" className="flex justify-center align-middle h-16">
          {
            expendSidebar ?
            <img src={StreamlineLogoSmall} alt="streamline logo" className="w-8" />
            :
            <img src={StreamlineLogo} alt="streamline logo" className="w-28" />
          }
        </Link>
      </div>
      <SidebarMenu expendSidebar={expendSidebar} />
    </div>
  );
};

export default Sidebar;
