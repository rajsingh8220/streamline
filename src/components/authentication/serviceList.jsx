import React from "react";
import Service1 from "./../../assets/images/service/s1.svg";
import Service2 from "./../../assets/images/service/s2.svg";
import Service3 from "./../../assets/images/service/s3.svg";
import Service4 from "./../../assets/images/service/s4.svg";
import Service5 from "./../../assets/images/service/s5.svg";
import Service6 from "./../../assets/images/service/s6.svg";

const ServicesList = (props) => {

  const ServicesList = [
    {
      name: "Sales Process Boards",
      value: "sales",
      description:
        "Manage your tasks with an intuitive project management tool created for sales teams.",
      Icon: Service1,
    },
    {
      name: "Campaigns",
      value: "campaigns",
      description:
        "Everything you need to create and manage campaigns and increase your sales.",
      Icon: Service2,
    },
    {
      name: "Marketing Process Boards",
      value: "marketing",
      description:
        "Manage your projects with an easy project management tool created for marketing teams.",
      Icon: Service3,
    },
    {
      name: "Training",
      value: "training",
      description:
        "Get ready to take your staff to the next level by offering tailored digital training experiences.",
      Icon: Service4,
    },
    {
      name: "Operational Process Boards",
      value: "operational",
      description:
        "Manage your next moves with a solid project management tool created for operational teams.",
      Icon: Service5,
    },
    {
      name: "CRM",
      value: "crm",
      description:
        "Build solid relationships with clients, agents and affiliates with a hassle free CRM tool.",
      Icon: Service6,
    },
  ];
  console.log(props.checked, "props.checked");
  return (
    <>
      {ServicesList.map((item, index) => {
        return (
          <div
            key={index}
            className="w-[48%] mb-4 sm:flex sm:items-start label relative"
          >
            {props.checked.includes(item.value) && (
              <input
                type="checkbox"
                id={`bordered-checkbox-${index}`}
                defaultChecked={props.checked.includes(item.value)}
                name="bordered-checkbox"
                checked={props.checked.includes(item.value)}
                className="peer checkbox checkbox-primary focus:ring-0 dark:focus:right-0 dark:ring-offset-0 focus:focus-within:ring-0 rounded-full w-6 h-6 absolute right-3.5 top-3.5"
              />
            )}
            <label
              onClick={() => props.handleChange(item.value)}
              htmlFor={`bordered-checkbox-${index}`}
              className="label-text space-x-4 inline-flex justify-between items-center border-2 border-module-border rounded-xl p-6 w-full text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600  dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-light-gray"
            >
              <img
                className="block mx-auto w-24 sm:mx-0 sm:shrink-0"
                src={item.Icon}
                alt="accounting service"
              />
              <div className="text-center space-y-2 sm:text-left">
                <div className="space-y-0.5 w-[95%]">
                  <p className="text-[22px] text-dark font-bold font-Karla">
                    {item.name}
                  </p>
                  <p className="text-light-dark text-sm font-medium font-Karla">
                    {item.description}
                  </p>
                </div>
              </div>
            </label>
          </div>
        );
      })}
    </>
  );
};

export default ServicesList;
