import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getRolesApi, updateRolesApi } from "../../Api/permissions";
import { login } from "../../pages/redux/user";
import Avtar from "./../../assets/images/avtar1.png";
import toast from "toastr";
import { useEffect } from "react";
import moment from "moment/moment";
import { userUpdateApi } from "../../Api/user";

const ChatSettings = () => {
  const userData = useSelector((state) => state.user.user);
  console.log(userData, "userData");
  const [selectMonth, setSelectMonth] = useState("");
  const [expiryValue, setExpiryValue] = useState("");

  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData && userData?.messageExpiry) {
      const d = moment(userData?.messageExpiry).format("YYYY-MM-DD");
      setSelectMonth(d);
      setExpiryValue(userData.expiryValue);
    }
  }, [userData.messageExpiry, userData.expiryValue]);

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !selectMonth:
        setErrors({ month: "Please select month!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleChange = (e) => {
    var currentDate = moment(new Date()).format("YYYY-MM-DD");
    if (e.target.value == "") {
      currentDate = "";
    }
    if (e.target.value == "1") {
      currentDate = moment().add(1, "M").format("YYYY-MM-DD");
    }
    if (e.target.value == "2") {
      currentDate = moment().add(2, "M").format("YYYY-MM-DD");
    }
    if (e.target.value == "3") {
      currentDate = moment().add(3, "M").format("YYYY-MM-DD");
    }

    setSelectMonth(currentDate);
    setExpiryValue(e.target.value);
    setErrors(null);
    setLoader(false);
  };
  console.log(expiryValue, "select");

  console.log(selectMonth, "selectMonth");

  const handleSubmit = async () => {
    if (isValid()) {
      setLoader(true);
      const obj = {
        messageExpiry: selectMonth,
        expiryValue: expiryValue,
      };
      const res = await userUpdateApi(obj);
      if (res?.data?.code === 200) {
        setLoader(false);
        toast.success(res.data.message);
        const obj = {
          ...userData,
          messageExpiry: selectMonth,
          expiryValue: expiryValue,
        };
        localStorage.setItem("userData", JSON.stringify(obj));
        dispatch(login(obj));

        setErrors(null);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
        setErrors(null);
      }
    }
  };
  return (
    <div className="block">
      <div className="flex columns-2 justify-between">
        <div className="block w-[60%]">
          <div className="block mb-8">
            <h2 className="text-text-dark font-Karla text-[22px] font-bold">
              Chat history
            </h2>
            <p className="font-Karla text-base text-light-dark">
              How long do you want to keep your chat history?
            </p>
          </div>
          <div className="block mb-3">
            <div className="block w-[90%]">
              <select
                name="deleteMonths"
                id="deleteMonths"
                className="w-full px-5 h-[50px] border border-input-border cursor-pointer text-light-dark text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={expiryValue}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                <option value="1">Delete after 1 month</option>
                <option value="2">Delete after 2 months</option>
                <option value="3">Delete after 3 months</option>
              </select>
            </div>
            <span className="form-error text-error text-sm font-normal">
              {errors && errors.month}
            </span>
          </div>
          <div className="d-block mb-4">
            <button
              type="button"
              className="text-primary text-sm bg-white border border-primary h-10 tracking-[-.03em] rounded-md px-3.5"
              onClick={handleSubmit}
            >
              Save settings
            </button>
          </div>
        </div>
        <div className="block w-[35%]">
          <div className="flex items-center space-x-4">
            <div className="block w-[90px] h-[90px]">
              <img
                src={Avtar}
                alt="avtar"
                className="rounded-full w-[90px] h-[90px]"
              />
            </div>
            <div className="block">
              <button
                type="button"
                className="rounded text-[11px] font-Karla text-white bg-active h-5 tracking-[-0.03em] pt-0.5 font-bold px-2.5"
              >
                Active
              </button>
              <h4 className="font-bold text-base">Manager</h4>
              <p className="font-normal text-base text-light-dark">
                Jan Jones{" "}
                <Link to="/" className="text-primary" underline>
                  Modify
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
