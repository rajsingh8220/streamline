import React from "react";
import { useSelector } from "react-redux";
import CampaignIcon from "./../../assets/icons/campaign.svg";
import MarketingProject from "./../../assets/icons/marketing-projects.svg";
import SalesIcon from "./../../assets/icons/sales-project.svg";
import TrainingIcon from "./../../assets/icons/training-icon.svg";
import CRMIcon from "./../../assets/icons/crm-icon.svg";
import MessageIcon from "./../../assets/icons/message-icon.svg";

export default function Home() {
  const userData = useSelector((state) => state.user.user);

  const DashboardCards = [
    {
      Icon: CampaignIcon,
      title: "Create a Campaign",
      descritpion:
        "Everything you need to create and manage campaigns for your listings.",
    },
    {
      Icon: MarketingProject,
      title: "Set up a Marketing project",
      descritpion:
        "Follow our simple editor to create, customize and launch your marketing project.",
    },
    {
      Icon: SalesIcon,
      title: "Set up a Sales project",
      descritpion:
        "Manage your projects and tasks with an intuitive project management tool created for sales teams.",
    },
  ];

  return (
    <div className="block">
      <h1 className="font-Karla font-bold text-xl mb-5 text-text-dark">
        Welcome {userData?.email}
      </h1>
      <div className="md:flex xs:block justify-between md:columns-2 xs:columns-1 mb-5">
        <div className="block md:mb-0 xs:mb-5 bg-white md:py-12 xs:py-6 md:px-8 xs:px-4 md:w-[66%] xs:w-[100%] rounded border border-light-border bg-dashBoardGraphic bg-no-repeat bg-auto bg-right-bottom">
          <h2 className="text-[28px] text-text-dark tracking-[-.03em] pb-4 font-bold font-Karla">
            Property Management
          </h2>
          <p className="md:w-[70%] xs:w-[100%] text-sm text-light-grey font-Karla">
            Your dashboard is customized with resources to get you started with
            Property Management solutions.
          </p>
          <div className="block mt-8">
            <button
              type="button"
              className="rounded-md font-medium text-sm bg-primary border-none text-white text-left border-2 py-2 px-4 font-Karla"
            >
              View listing
            </button>
          </div>
          <div className="block mt-3 md:mb-20 xs:mb-10">
            <button
              type="button"
              className="rounded-md text-sm font-medium bg-white border-primary text-primary text-left border-2 py-2 px-4 font-Karla"
            >
              Create new property
            </button>
          </div>
        </div>
        <div className="block md:w-[32%] xs:w-[100%] bg-white px-8 py-9 rounded border border-light-border">
          <div className="block mb-4">
            <div className="flex columns-2 space-x-3 mb-3">
              <img src={TrainingIcon} alt="training Icon" className="w-5" />
              <h4 className="text-base font-Karla font-bold text-text-dark">
                Training
              </h4>
            </div>
            <div className="block">
              <p className="text-light-grey text-sm font-Karla">
                Get ready to take your staff to the next level by offering
                tailored digital training experiences.
              </p>
            </div>
          </div>
          <hr />
          <div className="block mb-4 mt-4">
            <div className="flex columns-2 space-x-3 mb-3">
              <img src={CRMIcon} alt="CRM Icon" className="w-5" />
              <h4 className="text-base font-Karla font-bold text-text-dark">
                CRM
              </h4>
            </div>
            <div className="block">
              <p className="text-light-grey text-sm font-Karla">
                Build solid relationships with clients, agents and affiliates
                with a hassle free CRM tool.
              </p>
            </div>
          </div>
          <hr />
          <div className="block mb-4 mt-4">
            <div className="flex columns-2 space-x-3 mb-3">
              <img src={MessageIcon} alt="message Icon" className="w-5" />
              <h4 className="text-base font-Karla font-bold text-text-dark">
                Message team members
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex xs:block md:columns-3 xs:columns-1 justify-between">
        {DashboardCards.map((item, index) => {
          return (
            <div
              className="card xs:mb-5 md:mb-0 border border-light-border p-8 bg-white rounded md:w-[32%]"
              key={index}
            >
              <div className="block mb-8 bg-serviceArt2 bg-no-repeat bg-contain bg-left p-2.5 pl-1">
                <img src={item.Icon} alt="campaign" />
              </div>
              <div className="block">
                <h3 className="font-medium text-[22px] text-text-dark tracking-[-.03em] font-Karla mb-3">
                  {item.title}
                </h3>
                <p className="font-medium font-Karla text-sm tracking-[-.03em] text-light-grey">
                  {item.descritpion}
                </p>
              </div>
              <div className="block mt-8">
                <button
                  type="button"
                  className="rounded-md font-medium text-sm bg-white border-primary text-primary text-left border-2 py-2 px-4 font-Karla"
                >
                  View active boards
                </button>
              </div>
              <div className="block mt-3">
                <button
                  type="button"
                  className="rounded-md text-sm font-medium bg-white border-primary text-primary text-left border-2 py-2 px-4 font-Karla"
                >
                  New board
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
