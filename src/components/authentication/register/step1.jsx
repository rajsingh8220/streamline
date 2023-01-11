import React, { useState } from "react";
import "boxicons";
import { userUpdateApi } from "../../../Api/user";
import toast from "toastr";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../pages/redux/user";
import { useNavigate } from "react-router-dom";

const CreateAccountStep1 = ({ setStep, token }) => {
  toast.options = { preventDuplicates: true };

  const [errors, setErrors] = useState(null);
  const [newUser, setNewUser] = useState({});
  const [loader, setLoader] = useState(false);
  const [resData, setResData] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value.trimStart() });
    setErrors(null);
    setLoader(false);
  };

  const isValid = () => {
    const spaceRegex = /^.+ [^ ]*$/;

    let formData = true;
    switch (true) {
      case !newUser.password:
        setErrors({ password: "Password is required!" });
        formData = false;
        break;
      case newUser.password.length < 8:
        setErrors({
          password:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case !newUser.confirmPassword:
        setErrors({ confirmPassword: "Confirm Password is required!" });
        formData = false;
        break;

      case newUser.confirmPassword.length < 8:
        setErrors({
          confirmPassword:
            "Confirm Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case newUser.password !== newUser.confirmPassword:
        setErrors({
          confirmPassword: "Password and Confirm Password must matched!",
        });
        formData = false;
        break;
      // case newUser.password && !spaceRegex.test(newUser.password):
      //   setErrors({ password: "Invalid Password!" });
      //   formData = false;
      //   break;
      // case newUser.confirmPassword && !spaceRegex.test(newUser.confirmPassword):
      //   setErrors({ confirmPassword: "Invalid Confirm Password!" });
      //   formData = false;
      //   break;
      default:
        formData = true;
    }
    return formData;
  };

  useEffect(() => {
    const password = localStorage.getItem("password");
    if (password) setNewUser({ password: password, confirmPassword: password });
    else setNewUser({});
  }, []);

  console.log(resData, "resData");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      password: newUser.password ? newUser.password.trim() : "",
      stepCompleted: 2,
    };
    if (isValid()) {
      setLoader(true);
      const res = await userUpdateApi(obj);
      if (res.data.code === 200) {
        setErrors(null);
        // setNewUser({});
        localStorage.setItem("step", 2);
        localStorage.setItem("password", newUser.password);
        // localStorage.setItem("confirmPassword", newUser.confirmPassword);

        // toast.success(res.data.message);
        setStep(2);
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
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <p className="text-sm text-light-grey tracking-[-.03em] uppercase font-bold font-Karla">
        Step 1 of 4
      </p>
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-2 font-Karla">
        Welcome!
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        Please create your password
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
            value={newUser.password}
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
            value={newUser.confirmPassword}
            onChange={handleChange}
          />
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.confirmPassword}
          </span>
        </div>
        <div className="d-block mb-3">
          <p className=" text-light-grey tracking-[-.03em] text-sm font-Karla">
            Password must be 8 characters or longer
          </p>
        </div>
        <div className="flex justify-end mb-2 mt-8">
          <button
            type="submit"
            className="rounded-md font-bold flex items-center tracking-[-.03em] min-w-[152px] justify-center text-lg bg-primary text-white py-4 px-6 font-Karla"
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
      </form>
    </div>
  );
};

export default CreateAccountStep1;
