import React, { useEffect, useState } from "react";
import "boxicons";
import ServicesList from "../serviceList";
import { userUpdateApi } from "../../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../pages/redux/user";

const CreateAccountStep3 = ({ setStep, setmlsAccountView }) => {
  toast.options = { preventDuplicates: true };

  const handleBack = () => {
    localStorage.setItem("step", 2);
    setStep(2);
  };
  const [loader, setLoader] = useState(false);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(checked, "checked");

  const handleChange = (item1) => {
    console.log(item1, "item1");
    if (checked.includes(item1)) {
      const newArray = checked.filter((e) => e !== item1);

      setChecked(newArray);
    } else {
      const newArray = [...checked, item1];

      setChecked(newArray);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("services")) {
      const d = JSON.parse(localStorage.getItem("services"));
      console.log(d, "d");
      if (d) setChecked(d);
      else setChecked(checked);
    }
  }, []);

  const isValid = () => {
    let formData = true;
    switch (true) {
      case checked.length == 0:
        alert("Please select a Service");
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (isValid()) {
      const res = await userUpdateApi({
        services: checked.length > 0 ? checked : [],
        stepCompleted: 4,
      });
      if (res.data?.code === 200) {
        // toast.success(res.data.message);
        localStorage.setItem("step", 4);
        localStorage.setItem(
          "services",
          checked.length > 0 ? JSON.stringify(checked) : []
        );
        setStep(4);
        setLoader(false);
        if (res.data?.data?.mls_list.length > 0) setmlsAccountView(true);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (isValid()) {
      const res = await userUpdateApi({
        services: [],
        stepCompleted: 4,
      });
      if (res.data?.code === 200) {
        // toast.success(res.data.message);
        localStorage.setItem("step", 4);
        localStorage.setItem("services", []);
        setStep(4);
        setLoader(false);
        if (res.data?.data?.mls_list.length > 0) setmlsAccountView(true);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
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
    <div className="md:flex-1 w-full min-h-[65vh] flex flex-col justify-start">
      <p className="text-sm text-light-grey tracking-[-.03em] uppercase font-bold font-Karla">
        Step 3 of 4
      </p>
      <h1 className="text-3xl text-dark font-bold pb-3 font-Karla">
        What would you like to manage?
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Get started by selecting the services you need:
      </p>
      <form
        className="my-4 w-[90%]"
        onSubmit={
          !loader
            ? handleSubmit
            : (event) => {
                event.preventDefault();
              }
        }
      >
        <div className="flex flex-wrap justify-between mb-2">
          <ServicesList checked={checked} handleChange={handleChange} />
        </div>
        <div className="flex justify-between mt-8 mb-2">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-md text-lg bg-white tracking-[-.03em] font-bold border-blueDark text-blueDark border-2 py-4 px-8 font-Karla"
          >
            Back
          </button>
          <div className="flex items-center">
            <p
              className="underline text-lg text-light-dark font-Karla mr-4"
              onClick={handleNext}
            >
              I’m not sure yet
            </p>
            <button
              type="submit"
              className="rounded-md font-bold flex justify-center tracking-[-.03em] min-w-[152px] items-center text-lg bg-primary text-white py-4 px-6 font-Karla"
            >
              {loader ? (
                <>
                  <box-icon
                    name="loader-circle"
                    class="fill-white mr-2"
                    animation="spin"
                  ></box-icon>{" "}
                  Continue
                </>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountStep3;
