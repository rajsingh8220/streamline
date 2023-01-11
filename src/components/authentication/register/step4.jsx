import React, { useEffect, useState } from "react";
import "boxicons";
import MLSLogo from "./../../../assets/images/mls-logo.svg";
import ConnectedIcon from "./../../../assets/images/activeTick.svg";
import { userlistApi, userUpdateApi } from "../../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../pages/redux/user";

const CreateAccountStep4 = ({
  setStep,
  step,
  userData,
  getUserDetails,
  setmlsAccountView,
  mlsAccountView,
}) => {
  toast.options = { preventDuplicates: true };

  const [mlsAccount, setMlsAccount] = useState({});
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const [mlsData, setmlsData] = useState([]);
  // const [mlsAccountView, setmlsAccountView] = useState(false);

  const handleBack = () => {
    setStep(3);
    localStorage.setItem("step", 3);
    localStorage.removeItem("showMls");
  };
  const handleConnectMLS = async () => {
    if (isValid()) {
      const res = await userUpdateApi({
        mlsEmail: mlsAccount.email,
        mlsPassword: mlsAccount.password,
      });
      if (res.data?.code === 200) {
        setmlsAccountView(true);
        window.scrollTo(0, 0);
        getUserDetails();
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        setmlsAccountView(false);
        toast.error(res.data.message);
      }
    }
  };

  const handleAddMLS = () => {
    setmlsAccountView(false);
    setMlsAccount({});
    window.scrollTo(0, 0);
  };

  const handleChange = (e) => {
    setMlsAccount({
      ...mlsAccount,
      [e.target.name]: e.target.value.trimStart(),
    });
    setErrors(null);
    setLoader(false);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const spaceRegex = /^.+ [^ ]*$/;

    let formData = true;
    switch (true) {
      case !mlsAccount.email:
        setErrors({ email: "Email is required!" });
        formData = false;
        break;

      case mlsAccount.email && !emailReg.test(mlsAccount.email):
        setErrors({ email: "Please enter Valid Email Address!" });
        formData = false;
        break;

      case !mlsAccount.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case mlsAccount.password.length < 8:
        setErrors({
          password:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;
      // case mlsAccount.email && !spaceRegex.test(mlsAccount.email):
      //   setErrors({ email: "Invalid Email!" });
      //   formData = false;
      //   break;
      // case mlsAccount.password && !spaceRegex.test(mlsAccount.password):
      //   setErrors({ password: "Invalid Email!" });
      //   formData = false;
      //   break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleClickNext = async () => {
    // localStorage.setItem("userData", JSON.stringify(userData));
    // dispatch(login(userData));
    // navigate("/");
    setLoader(true);
    const res = await userUpdateApi({
      stepCompleted: 5,
    });
    setLoader(false);
    navigate("/register-success");
    // localStorage.removeItem("step");
    // localStorage.removeItem("services");
    // localStorage.removeItem("instanceUrl");
    // localStorage.removeItem("password");
    localStorage.clear();
  };
  const steps = localStorage.getItem("step");
  useEffect(() => {
    console.log(steps, ":steps");
    // localStorage.clear();
    if (!steps) navigate("/register");
  }, [steps]);
  return (
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <p className="text-sm text-light-grey tracking-[-.03em] uppercase font-bold font-Karla">
        Step 4 of 4
      </p>
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-3 font-Karla">
        Connect with third-party accounts
      </h1>
      <p className="text-base text-light-grey tracking-[-.03em] font-medium pb-2 font-Karla">
        You can select multiple accounts. You can skip this step and add those
        later.
      </p>
      <form className="my-4">
        {mlsAccountView ? (
          <>
            {userData &&
              userData._id &&
              userData.mls_list.map((item) => {
                return (
                  <div className="d-block mb-2 relative">
                    <input
                      type="email"
                      name="email"
                      className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla pl-28"
                      placeholder="MLS Account Email"
                      value={item.mlsEmail}
                      // onChange={handleChange}
                    />

                    <img
                      src={MLSLogo}
                      alt="logo"
                      className="w-20 absolute top-3 left-1"
                    />
                    <img
                      src={ConnectedIcon}
                      alt="connected Tick Icon"
                      className="w-6 absolute top-[18px] right-[18px]"
                    />
                  </div>
                );
              })}

            <div className="d-block mb-14">
              <button
                onClick={handleAddMLS}
                type="button"
                className="rounded-md text-lg bg-white border-primary text-primary text-left border-2 py-4 px-8 font-Karla w-full"
              >
                + Add new MLS account
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="d-block mb-2">
              <input
                type="email"
                name="email"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="MLS Account Email"
                value={mlsAccount.email}
                onChange={handleChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.email}
              </span>
            </div>
            <div className="d-block mb-2">
              <input
                type="password"
                name="password"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="MLS password"
                value={mlsAccount.password}
                onChange={handleChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.password}
              </span>
            </div>
            <div className="flex justify-end mb-10">
              <button
                type="button"
                onClick={handleConnectMLS}
                className="rounded-md text-lg font-bold bg-white tracking-[-.03em] border-primary text-primary border-2 py-4 px-8 font-Karla"
              >
                Connect
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between mb-2">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-md text-lg bg-white tracking-[-.03em] font-bold border-blueDark text-blueDark border-2 py-4 px-8 font-Karla"
          >
            Back
          </button>
          <div className="flex items-center">
            <p
              className="underline text-lg text-primary font-Karla mr-2"
              onClick={handleClickNext}
            >
              I will do this later
            </p>
            <button
              type="button"
              className="rounded-md font-bold flex items-center tracking-[-.03em] min-w-[152px] justify-center text-lg bg-primary text-white py-4 px-10 font-Karla"
              onClick={handleClickNext}
            >
              {loader ? (
                <>
                  <box-icon
                    name="loader-circle"
                    class="fill-white mr-2"
                    animation="spin"
                  ></box-icon>{" "}
                  Ready{" "}
                </>
              ) : (
                "Ready"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountStep4;
