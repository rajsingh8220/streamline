import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userUpdateApi } from "../../../Api/user";
import { login } from "../../../pages/redux/user";
import toast from "toastr";
import { useDispatch, useSelector } from "react-redux";

export default function ServiceList({
  index,
  item,
  checked,
  setLoader,
  setChecked,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user);

  useEffect(() => {
    if (userData.services) setChecked(userData.services);
    else setChecked(checked);
  }, [userData.services]);

  const handleServicesChange = async (item) => {
    if (checked.includes(item)) {
      const newArray = checked.filter((e) => e !== item);
      const res = await userUpdateApi({
        services: newArray,
      });
      if (res?.data?.code === 200) {
        setChecked(res?.data?.data?.services);
        toast.success("Services Updated Successfully");
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        dispatch(login(res.data.data));
      } else if (res?.data?.code === 401) {
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    } else {
      const newArray = [...checked, item];
      const res = await userUpdateApi({
        services: newArray,
      });
      if (res?.data?.code === 200) {
        setChecked(res?.data?.data?.services);
        toast.success("Services Updated Successfully");
        localStorage.setItem("userData", JSON.stringify(res.data.data));
        dispatch(login(res.data.data));
      } else if (res?.data?.code === 401) {
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    }
  };

  return (
    <div
      key={index}
      className="w-[48%] mb-4 sm:flex sm:items-start label relative"
    >
      <div className="label-text border-2 border-module-border rounded-xl p-6 w-full text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600  dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-light-gray">
        <div className="flex items-start">
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5 w-[95%]">
              <p className="text-xl text-dark font-bold font-Karla mb-1">
                {item.name}
              </p>
              <p className="text-light-dark text-sm font-medium font-Karla">
                {item.description}
              </p>
            </div>
          </div>
          <div className="block bg-serviceArt1 bg-no-repeat bg-contain bg-right py-3">
            <img
              className="block relative right-2 mx-auto w-16 min-w-[60px] h-16 sm:mx-0 sm:shrink-0"
              src={item.Icon}
              alt="accounting service"
            />
          </div>
        </div>
        <div className="flex items-center mt-4 columns-2 ml-0">
          <div className="flex space-x-3 w-[60%]">
            <div className="block">
              <img src={item.userProfile} alt="avtar" />
            </div>
            <div className="block">
              <h4 className="font-bold text-sm">Manager</h4>
              <p className="font-normal text-xs">
                Jan Jones{" "}
                <Link to="/" className="text-primary">
                  Modify
                </Link>
              </p>
            </div>
          </div>
          <div className="flex justify-end w-[40%]">
            <label
              for={`default-toggle${index}`}
              className="inline-flex relative items-center cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked.includes(item.value)}
                defaultChecked={checked.includes(item.value)}
                id={`default-toggle${index}`}
                className="sr-only peer"
                onClick={() => handleServicesChange(item.value)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5EE092]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
