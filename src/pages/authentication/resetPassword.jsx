import React, { useState } from "react";
import "boxicons";
import { updatePassApi } from "../../Api/user";
import { useNavigate } from "react-router-dom";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";

const ResetPassword = () => {
  toast.options = { preventDuplicates: true };

  const urlParams = new URLSearchParams(window.location.search);
  const accesstoken = urlParams.get("accesstoken");

  const [userPassword, setUserPassword] = useState({});
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setUserPassword({
      ...userPassword,
      [e.target.name]: e.target.value.trimStart(),
    });
    setErrors(null);
    setLoader(false);
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !userPassword.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case userPassword.password.length < 8:
        setErrors({
          password:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case !userPassword.confirmPassword:
        setErrors({ confirmPassword: "Confirm Password is required!" });
        formData = false;
        break;
      case userPassword.password !== userPassword.confirmPassword:
        setErrors({
          confirmPassword: "Password and Confirm Password must matched!",
        });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      setLoader(true);
      const obj = {
        password: userPassword.password ? userPassword.password.trim() : "",
      };
      const res = await updatePassApi(obj, accesstoken);
      if (res && res.data && res.data.code === 200) {
        toast.success("Password Updated Successfully");
        navigate("/login");
        setLoader(false);
        setUserPassword({});
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
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-3 font-Karla">
        Create new password
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Please enter the following information
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
        <div className="d-block mb-2">
          <input
            type="password"
            name="password"
            className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
            placeholder="Password"
            value={userPassword.password}
            onChange={handleChange}
          />
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.password}
          </span>
        </div>
        <div className="d-block mb-2">
          <input
            type="password"
            name="confirmPassword"
            className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
            placeholder="Confirm Password"
            value={userPassword.confirmPassword}
            onChange={handleChange}
          />
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.confirmPassword}
          </span>
        </div>
        <div className="d-block mb-3">
          <p className="text-light-grey tracking-[-.03em] text-sm font-Karla">
            Password must be 8 characters or longer
          </p>
        </div>
        <div className="flex justify-end mb-2 mt-8">
          <button
            type="submit"
            className="rounded-md font-bold flex tracking-[-.03em] items-center text-lg bg-primary text-white py-4 px-6 font-Karla"
          >
            {loader ? (
              <>
                <box-icon
                  name="loader-circle"
                  class="fill-white mr-2"
                  animation="spin"
                ></box-icon>{" "}
                Confirm
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
