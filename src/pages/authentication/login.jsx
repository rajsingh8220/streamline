import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "boxicons";
import { useDispatch } from "react-redux";
import { login } from "../redux/user";
import { loginApi } from "../../Api/user";
import toast from "toastr";

const Login = () => {
  toast.options = { preventDuplicates: true };

  const [data, setData] = useState({});
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value.trimStart() });
  };

  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const spaceRegex = /^.+ [^ ]*$/;
    let formData = true;
    switch (true) {
      case !data.email:
        setErrors({ email: "Email is required!" });
        formData = false;
        break;

      case data.email && !emailReg.test(data.email):
        setErrors({ email: "Please enter Valid Email Address!" });
        formData = false;
        break;
      // case data.email && !spaceRegex.test(data.email):
      //   setErrors({ email: "Invalid Email!" });
      //   formData = false;
      //   break;

      case !data.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case data.password.length < 8:
        setErrors({
          password:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;
      // case data.password && !spaceRegex.test(data.password):
      //   setErrors({
      //     password: "Invalid Password!",
      //   });
      //   formData = false;
      //   break;

      default:
        formData = true;
    }
    return formData;
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email: data.email ? data.email.trim() : "",
      password: data.password ? data.password.trim() : "",
    };
    if (isValid()) {
      setLoader(true);
      const res = await loginApi(obj);
      if (res && res.data && res.data.code == 200) {
        console.log(res.data, "res.data", res.data.data.user.services);
        toast.success("Logged In");
        localStorage.setItem("token", res.data.data.token);

        if (res.data.data.user.stepCompleted < 5) {
          localStorage.setItem("step", res.data.data.user.stepCompleted);
          localStorage.setItem(
            "password",
            data.password ? data.password.trim() : ""
          );
          localStorage.setItem(
            "instanceUrl",
            res.data.data.user.instanceUrl
              ? res.data.data.user.instanceUrl.trim()
              : ""
          );
          localStorage.setItem(
            "services",
            res.data.data.user.services.length > 0
              ? JSON.stringify(res.data.data.user.services)
              : ""
          );
          setLoader(false);

          navigate("/register/steps");
        } else {
          localStorage.setItem("userData", JSON.stringify(res.data.data.user));
          dispatch(login(res.data.data.user));
          setLoader(false);
          navigate("/");
        }
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
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <h1 className="text-3xl text-text-dark font-bold pb-3 font-Karla">
        Welcome
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Please enter the following information to log into your account:
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
            type="email"
            name="email"
            className="rounded border border-input-border h-[60px] text-lg w-full py-3 px-5 outline-none font-Karla"
            placeholder="Email"
            value={data.email}
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
            className="rounded border border-input-border h-[60px] text-lg w-full py-3 px-5 outline-none font-Karla"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.password}
          </span>
        </div>
        <div className="d-block mb-3">
          <Link
            to="/forgot-password"
            className="underline text-light-grey tracking-[-.03em] text-sm font-Karla"
          >
            Forgot password?
          </Link>
        </div>
        <div className="flex justify-end mb-2">
          <button
            type="submit"
            className="rounded-md font-bold flex items-center text-lg bg-primary text-white py-4 px-7 font-Karla"
          >
            {loader ? (
              <>
                <box-icon
                  name="loader-circle"
                  class="fill-white mr-2"
                  animation="spin"
                ></box-icon>{" "}
                Log in
              </>
            ) : (
              "Log in"
            )}
          </button>
        </div>
        <div className="flex justify-end mb-2">
          <p className="text-light-grey text-sm font-Karla">
            Don’t have an account yet?{" "}
            <Link to="/register" className="underline font-Karla">
              {" "}
              Create account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
