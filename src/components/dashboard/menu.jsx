import React from "react";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({expendSidebar}) => {
  const menuItems = [
    {
      Icon: <box-icon name="home-alt" class="w-5 fill-light-gray"></box-icon>,
      menu: "Home",
      url: "/",
    },
    {
      Icon: <box-icon name="copy" class="w-5 fill-light-gray"></box-icon>,
      menu: "Process Boards",
      url: "/process-boards",
    },
    {
      Icon: (
        <box-icon name="building-house" class="w-5 fill-light-gray"></box-icon>
      ),
      menu: "Properties",
      url: "/properties",
    },
    {
      Icon: (
        <box-icon
          type="solid"
          name="hand"
          class="w-5 fill-light-gray"
        ></box-icon>
      ),
      menu: "Deals",
      url: "/deals",
    },
    {
      Icon: <box-icon name="file" class="w-5 fill-light-gray"></box-icon>,
      menu: "Documents",
      url: "/documents",
    },
    {
      Icon: <box-icon name="smile" class="w-5 fill-light-gray"></box-icon>,
      menu: "Contacts",
      url: "/contacts",
    },
    {
      Icon: (
        <box-icon name="message-square" class="w-5 fill-light-gray"></box-icon>
      ),
      menu: "Messaging",
      url: "/message",
    },
    {
      Icon: (
        <box-icon
          type="solid"
          name="report"
          class="w-5 fill-light-gray"
        ></box-icon>
      ),
      menu: "Reporting",
      url: "/reporting",
    },
  ];
  return (
    <div className="block">
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="cursor-pointer">
              <NavLink
                to={item.url || `${item.url}/`}
                className={({ isActive }) =>
                isActive ? "px-6 py-3 flex items-center bg-primary/[0.06] text-sm text-light-gray" : "px-6 py-3 flex items-center text-sm text-light-gray bg-white"
                }
                end
              >
                {item.Icon} {expendSidebar ? '' : <span className="ml-2">{item.menu}</span>} 
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidebarMenu;
