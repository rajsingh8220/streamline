import React, { useState } from "react";
import "boxicons";
import { Link, useNavigate } from "react-router-dom";
import { userRegisterApi } from "../../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { login } from "../../../pages/redux/user";

const CreateAccount = ({ setStep }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value.trimStart() });
    setErrors(null);
    setLoader(false);
  };

  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const spaceRegex = /"^[^\s\-].*[^\s\-]$"/;

    let formData = true;
    switch (true) {
      case !newUser.companyName:
        setErrors({ companyName: "Company Name is required!" });
        formData = false;
        break;

      case !newUser.email:
        setErrors({ email: "Email is required!" });
        formData = false;
        break;

      case newUser.email && !emailReg.test(newUser.email):
        setErrors({ email: "Please enter Valid Email Address!" });
        formData = false;
        break;
      // case newUser.companyName && !spaceRegex.test(newUser.companyName):
      //   setErrors({ companyName: "Invalid Company Name!" });
      //   formData = false;
      //   break;
      // case newUser.email && !spaceRegex.test(newUser.email):
      //   setErrors({ email: "Invalid Email!" });
      //   formData = false;
      //   break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      companyName: newUser.companyName ? newUser.companyName.trim() : "",
      email: newUser.email ? newUser.email.trim() : "",
    };
    if (isValid()) {
      setLoader(true);
      const res = await userRegisterApi(obj);
      if (res && res.data?.code === 200) {
        console.log(res.data, "res.data");
        setErrors(null);
        setNewUser({});
        navigate(`/verify-email/${res.data?.activationCode}`);
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
    <>
      <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
        <h1 className="text-3xl text-dark font-bold pb-3 font-Karla">
          Sign up
        </h1>
        <form
          className="mt-4"
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
              type="text"
              name="companyName"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Company name"
              value={newUser.companyName}
              onChange={handleChange}
            />
            <span className="form-error text-error text-sm font-normal">
              {errors && errors.companyName}
            </span>
          </div>
          <div className="d-block mb-2">
            <input
              type="email"
              name="email"
              className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
              placeholder="Email"
              value={newUser.email}
              onChange={handleChange}
            />
            <span className="form-error text-error text-sm font-normal">
              {errors && errors.email}
            </span>
          </div>

          <div className="d-block mb-3">
            <p className=" text-light-grey tracking-[-.03em] text-sm font-Karla">
              By signing up, I agree to the{" "}
              <Link to="/register" className="underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/register" className="underline">
                Terms of Service
              </Link>
            </p>
          </div>
          <div className="flex justify-end mb-2 mt-8">
            <button
              type="submit"
              className="rounded-md min-w-[152px] justify-center font-bold flex items-center text-base bg-primary text-white py-4 px-6 font-Karla"
            >
              {loader ? (
                <>
                  <box-icon
                    name="loader-circle"
                    class="fill-white mr-2"
                    animation="spin"
                  ></box-icon>{" "}
                  Sign Up
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAccount;
