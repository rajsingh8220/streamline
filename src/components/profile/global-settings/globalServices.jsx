import React, { useState } from "react";
import Service1 from "./../../../assets/images/service/s11.svg";
import Service2 from "./../../../assets/images/service/s12.svg";
import Service3 from "./../../../assets/images/service/s13.svg";
import Service4 from "./../../../assets/images/service/s14.svg";
import Service5 from "./../../../assets/images/service/s15.svg";
import Service6 from "./../../../assets/images/service/s16.svg";
import ProfileAvtar from "./../../../assets/images/avtar.png";

import toast from "toastr";
import ServiceList from "./serviceList";

const ServicesList = [
  {
    name: "Sales Process Boards",
    value: "sales",
    description:
      "Manage your tasks with an intuitive project management tool created for sales teams.",
    Icon: Service1,
    userProfile: ProfileAvtar,
  },
  {
    name: "Marketing Process Boards",
    value: "marketing",
    description:
      "Everything you need to create and manage campaigns and increase your sales.",
    Icon: Service2,
    userProfile: ProfileAvtar,
  },
  {
    name: "Operational Process Boards",
    value: "operational",
    description:
      "Manage your projects with an easy project management tool created for marketing teams.",
    Icon: Service3,
    userProfile: ProfileAvtar,
  },
  {
    name: "Campaigns",
    value: "campaigns",
    description:
      "Get ready to take your staff to the next level by offering tailored digital training experiences.",
    Icon: Service4,
    userProfile: ProfileAvtar,
  },
  {
    name: "Training",
    value: "training",
    description:
      "Quisque non libero mi. Proin facilisis aliquam faucibus. Aenean dapibus gravida varius.",
    Icon: Service5,
    userProfile: ProfileAvtar,
  },
  {
    name: "CRM",
    value: "crm",
    description:
      "Quisque non libero mi. Proin facilisis aliquam faucibus. Aenean dapibus gravida varius.",
    Icon: Service6,
    userProfile: ProfileAvtar,
  },
];

const Services = () => {
  toast.options = { preventDuplicates: true };
  const [checked, setChecked] = useState([]);
  const [loader, setLoader] = useState(false);

  return (
    <div className="flex justify-between flex-wrap">
      {ServicesList.map((item, index) => {
        return (
          <ServiceList
            item={item}
            index={index}
            checked={checked}
            setChecked={setChecked}
            setLoader={setLoader}
            loader={loader}
          />
        );
      })}
    </div>
  );
};

export default Services;
