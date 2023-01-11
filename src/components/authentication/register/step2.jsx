import React, { useEffect, useState } from "react";
import "boxicons";
import { userUpdateApi } from "../../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../pages/redux/user";

const CreateAccountStep2 = ({ setStep }) => {
  toast.options = { preventDuplicates: true };

  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const d = e.target.value.trimStart();
    setUrl(d);
    setErrors(null);
    setLoader(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const instanceUrl = localStorage.getItem("instanceUrl");
    if (instanceUrl) setUrl(instanceUrl);
    else setUrl(url);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      setLoader(true);
      const res = await userUpdateApi({
        instanceUrl: url ? url.trim() : "",
        stepCompleted: 3,
      });
      if (res.data?.code === 200) {
        // toast.success(res.data.message);
        localStorage.setItem("step", 3);
        localStorage.setItem("instanceUrl", url);

        setErrors(null);
        setStep(3);
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
  const handleBack = () => {
    setStep(1);
    localStorage.setItem("step", 1);
  };

  var containsWhitespace = function (str) {
    return /\s/g.test(str);
  };

  const isValid = () => {
    const regex = /^[a-zA-Z0-9_.-]*$/;
    const spaceRegex = /^.+ [^ ]*$/;

    let formData = true;
    switch (true) {
      case !url:
        setErrors({ url: "Instance Url is required!" });
        formData = false;
        break;
      case url && url.length > 30:
        setErrors({ url: "Instance url max length 30!" });
        formData = false;
        break;
      case url && containsWhitespace(url):
        setErrors({ url: "Please Enter Valid Instance!" });
        formData = false;
        break;
      case url && !regex.test(url):
        setErrors({ url: "Please Enter Valid Instance!" });
        formData = false;
        break;
      // case url && !spaceRegex.test(url):
      //   setErrors({ url: "Please Enter Valid Instance!" });
      //   formData = false;
      //   break;
      default:
        formData = true;
    }
    return formData;
  };

  return (
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <p className="text-sm text-light-grey tracking-[-.03em] uppercase font-bold font-Karla">
        Step 2 of 4
      </p>
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-3 font-Karla">
        Set up your instance url
      </h1>
      <p className="text-base text-light-grey font-medium tracking-[-.03em] pb-2 font-Karla">
        You (and your co-workers) will access the platform from that address
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
        <div className="d-block mb-6 relative">
          <input
            type="text"
            name="url"
            className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
            placeholder="client-name"
            value={url}
            onChange={handleChange}
            maxLength={30}
          />
          <span className="absolute min-w-[180px] flex items-center justify-center font-medium text-light-gray border-l border-light-border right-0 top-0 h-[60px]">
            .streamline.com
          </span>
          <span className="form-error text-error text-sm font-normal">
            {errors && errors.url}
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-md text-lg bg-white tracking-[-.03em] font-bold border-blueDark text-blueDark border-2 py-4 px-8 font-Karla"
          >
            Back
          </button>
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

export default CreateAccountStep2;
