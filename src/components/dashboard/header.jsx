import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../pages/redux/user";
import UserProfile from "./../../assets/images/user.webp";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { userImageGetApi } from "../../Api/user";
import toast from "toastr";

const DashboardHeader = ({handleToggleSidebar, expendSidebar}) => {
  toast.options = { preventDuplicates: true };
  const userData = useSelector((state) => state.user.user);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(login({}));
    navigate("/login");
  };

  const handleBurgerMenu = () => {
    handleToggleSidebar()
  }


  useEffect(() => {
    if (userData.profile_image) imageGet();
  }, [userData.profile_image]);

  const imageGet = async () => {
    const res = await userImageGetApi(userData.profile_image);
    if (res?.data?.code === 200) {
      const obj = {
        ...userData,
        display_image: res.data.data,
      };
      dispatch(login(obj));
      setImage(res.data.data);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <div className={expendSidebar ? "flex items-center z-50 justify-between fixed w-[calc(100%-70px)] h-16 left-[70px] bg-white top-0 px-5 py-6 border-l border-light-border" : "flex items-center z-50 justify-between fixed w-[calc(100%-208px)] h-16 left-52 bg-white top-0 px-5 py-6 border-l border-light-border"}>
        <div className="flex">
          <button onClick={handleBurgerMenu} className="flex">
            <box-icon
              name="menu"
              class="text-light-dark cursor-pointer"
            ></box-icon>
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex px-3">
            <box-icon name="message-square" class="text-light-dark"></box-icon>
          </button>
          <button className="flex px-3">
            <box-icon
              type="outline"
              name="bell"
              class="text-light-dark"
            ></box-icon>
          </button>
          <button className="flex items-center px-3">
            <img
              src={image ? image : UserProfile}
              className="rounded-full w-10 h-10"
              alt="profile avtar"
            />
            <span className="text-sm font-Karla text-light-dark ml-2">
              {userData?.firstName && userData?.firstName.length > 10
                ? `${userData.firstName.substring(0, 10)}...`
                : userData.firstName}
            </span>
            <box-icon name="chevron-down"></box-icon>
          </button>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex">
                <box-icon name="cog" class="text-light-dark"></box-icon>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="fixed right-0 z-10 top-16 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="w-64 bg-white z-40 drop-shadow-md right-0 top-16">
                  <div className="p-5">
                    <p className="text-sm font-Karla font-medium mb-1">
                      {userData?.email}
                    </p>
                    <Menu.Item>
                      <NavLink
                        to="/settings/global-company-setting"
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm block font-Karla pb-1 font-medium text-primary"
                            : "text-sm font-Karla block pb-1 font-medium text-light-gray hover:text-primary"
                        }
                      >
                        Global company settings
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                      <NavLink
                        to="/settings/personal-setting"
                        className={({ isActive }) =>
                          isActive
                            ? "text-sm font-Karla block font-medium text-primary"
                            : "text-sm font-Karla block font-medium text-light-gray hover:text-primary"
                        }
                      >
                        Personal account settings
                      </NavLink>
                    </Menu.Item>
                  </div>
                  <div className="block">
                    <NavLink
                      to="/support"
                      className={({ isActive }) =>
                        isActive
                          ? "text-sm font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                          : "text-sm font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                      }
                    >
                      Support
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="text-sm w-full pl-5 font-Karla flex items-center border-t border-light-border h-12 font-medium text-light-gray hover:text-primary"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
