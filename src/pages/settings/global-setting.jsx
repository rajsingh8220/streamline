import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountDetails from "../../components/profile/global-settings/accountDetails";
import CompanySetting from "../../components/profile/global-settings/companySetting";
import GlobalBillings from "../../components/profile/global-settings/globalBillings";
import GlobalNotifications from "../../components/profile/global-settings/globalNotifications";
import GlobalServices from "../../components/profile/global-settings/globalServices";
import GlobalUser from "../../components/profile/global-settings/globalUsers";
import toast from "toastr";

const settingListItems = [
  { id: "1", title: "Account details" },
  { id: "2", title: "Company settings" },
  { id: "3", title: "Services" },
  { id: "4", title: "Users" },
  { id: "5", title: "Notifications" },
  { id: "6", title: "Billings" },
];

const GlobalCompanySetting = () => {
  toast.options = { preventDuplicates: true };

  const [open, setOpen] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false)
  const [openTab, setOpenTab] = React.useState(1);

  const onOpenModal = () => {
    setOpen(true);
  };

  const backtoUser = () => {
    setOpenTab(4)
    setShowUserDetail(false)
  }

  return (
    <div className="block">
      <div className="flex min-h-[40px] justify-between items-center columns-2">
        <h1 className="font-Karla text-text-dark text-xl font-bold tracking-[-0.03em]">
          Global company settings ›{" "}
          <span className={showUserDetail ? "text-dark font-normal" : "text-primary"}>
          {showUserDetail ? <button onClick={backtoUser}>{settingListItems && settingListItems[openTab - 1].title}</button> : `${settingListItems && settingListItems[openTab - 1].title}`}    {showUserDetail && <span className="font-bold text-primary"> › User Details</span>}
          </span>
        </h1>
        {openTab === 4 ? (
          showUserDetail ? 
            <button
              type="button"
              className="rounded-md font-bold text-sm bg-danger border-danger text-white text-left border-2 py-2 px-4 font-Karla"
            >
              Delete User
            </button> 
            : 
            <button
              type="button"
              onClick={onOpenModal}
              className="rounded-md font-bold text-sm bg-primary border-primary text-white text-left border-2 py-2 px-4 font-Karla"
            >
              + Invite new user
            </button>
          ): ''
        }
      </div>
      <div className="w-full flex justify-between mt-10">
        {
          !showUserDetail && 
          <ul className="mb-0 list-none w-[20%] pb-4" role="tablist">
            {settingListItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className="-mb-px mr-2 last:mr-0 flex-auto text-left"
                >
                  <Link
                    className={
                      "text-sm font-medium font-Karla px-5 py-3 rounded block leading-normal " +
                      (openTab === index + 1
                        ? "text-primary bg-primary/10"
                        : "text" + "-primary" + " bg-transparent")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(index + 1);
                    }}
                    data-toggle="tab"
                    to={`#link${item.id}`}
                    role="tablist"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        }
        
        <div
          className={
            openTab === 3  
              ? "relative w-[78%] flex flex-col min-w-0 break-words mb-6"
              : (showUserDetail ? "relative w-full flex flex-col min-w-0 break-words mb-6" : "relative w-[78%] flex flex-col min-w-0 break-words border border-module-border bg-white mb-6 rounded")
          }
        >
          <div
            className={openTab === 3 ? "px-0 flex-auto" : (showUserDetail ? "py-0 px-1 flex-auto" : "py-8 px-9 flex-auto")}
          >
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <AccountDetails />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                <CompanySetting />
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <GlobalServices />
              </div>
              <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                <GlobalUser showUserDetail={showUserDetail} setShowUserDetail={setShowUserDetail} open={open} setOpen={setOpen} />
              </div>
              <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                <GlobalNotifications />
              </div>
              <div className={openTab === 6 ? "block" : "hidden"} id="link6">
                <GlobalBillings />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCompanySetting;
