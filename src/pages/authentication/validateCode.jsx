import React, { useState } from "react";
import "boxicons";
import { useNavigate } from "react-router-dom";
import { verifyOtpApi } from "../../Api/user";
import OtpInput from "../../helpers/otbInputs";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";

const ValidateCode = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const varificationId = urlParams.get("varificationId");
  const [otp, setOtp] = useState("");
  const email = localStorage.getItem("email");
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !otp:
        setErrors({ otp: "Please enter the OTP!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid()) {
      setLoader(true);
      const obj = {
        token: otp,
        verificationId: varificationId,
        email: email,
      };
      const res = await verifyOtpApi(obj);
      if (res && res.data && res.data.code === 200) {
        navigate(`/reset-password?accesstoken=${res.data.accessToken}`);
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

  const handleChange = (value) => {
    setErrors({});
    const val = parseInt(value);
    setOtp(val);
  };

  console.log(otp, "value");

  return (
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-3 font-Karla">
        Enter validation code
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] font-Karla">
        We’ve sent you a 6-digit validation token to your phone.
      </p>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Please enter the code below.
      </p>
      <form
        className="my-4"
        onSubmit={
          !loader
            ? handleSubmit
            : (event) => {
                event.preventDefault();
              }
        }
      >
        <div className="flex pl-1 mb-3 rounded border h-[60px] border-input-border w-full">
          {/* <input type="text" className="rounded border border-input-border h-[60px] text-lg w-full p-3 px-5 outline-none font-Karla" placeholder='Enter OTP' /> */}
          {/* {[1, 2, 3, 4, 5, 6].map((digit, idx) => ( */}
          {/* <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            // pattern="\d{1}"
            maxLength={6}
            className="otp-input focus:outline-0 focus:border-0 w-10 outline-none text-2xl text-black text-center border-0"
            value={otp}
            onChange={handleChange}
          /> */}
          {/* ))} */}
          <OtpInput
            numInputs={6}
            value={otp}
            valueLength={6}
            handleChange={handleChange}
          />
        </div>
        <span className="form-error text-error text-sm font-normal">
          {errors && errors.otp}
        </span>
        <div className="flex justify-start mb-2 mt-8">
          <button
            type="submit"
            className="rounded-md tracking-[-.03em] font-bold flex items-center h-[60px] text-lg bg-primary text-white py-4 px-6 font-Karla"
          >
            {loader ? (
              <>
                <box-icon
                  name="loader-circle"
                  class="fill-white mr-2"
                  animation="spin"
                ></box-icon>{" "}
                Submit
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValidateCode;
