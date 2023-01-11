import React, { useState } from "react";
import "boxicons";
import { useNavigate } from "react-router-dom";
import { forgotPassApi } from "../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
const ForgotPassword = () => {
  const [data, setData] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setData(e.target.value.trimStart());
    setErrors(null);
    setLoader(false);
  };

  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let formData = true;
    switch (true) {
      case !data:
        setErrors({
          value: "Please enter your registered email address.",
        });
        formData = false;
        break;
      case data && !emailReg.test(data):
        setErrors({ value: "Please enter Valid Email Address!" });
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
        email: data ? data.trim() : "",
        userType: "user",
      };
      const res = await forgotPassApi(obj);
      if (res && res.data && res.data.code === 200) {
        toast.success("OTP send successfully!");
        localStorage.setItem("email", data);
        navigate(
          `/validate-code?varificationId=${res?.data?.data?.otpRecordId}`
        );
        setLoader(false);
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
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md  xl:p-16 xs:p-6">
      <h1 className="text-3xl text-dark font-bold pb-3 font-Karla">
        Reset password
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Enter the email or phone associated with your account and we’ll send
        instructions to reset your password.
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
        <div className="d-block mb-3">
          <input
            type="text"
            name="email"
            className="rounded border border-input-border h-[60px] text-lg w-full p-3 px-5 outline-none font-Karla"
            placeholder="Email"
            value={data}
            onChange={handleChange}
          />
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.value}
          </span>
        </div>
        <div className="flex justify-start mb-2">
          <button
            type="submit"
            className="rounded-md font-bold flex items-center h-[60px] text-lg bg-primary text-white py-4 px-6 font-Karla"
          >
            {loader ? (
              <>
                <box-icon
                  name="loader-circle"
                  class="fill-white mr-2"
                  animation="spin"
                ></box-icon>{" "}
                Send instructions
              </>
            ) : (
              "Send instructions"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
