import React, { useState } from "react";
import CompanyLogoPic from "./../../../assets/images/company-logo.svg";
import AddIcon from "./../../../assets/images/add-icons.svg";
import toast from "toastr";
import {
  companyDetailApi,
  updateCompanyDetailApi,
  userImageUploadApi,
  userImageGetApi,
} from "../../../Api/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../pages/redux/user";
import { useEffect } from "react";

const CompanySetting = ({ S3Client }) => {
  const [data, setdata] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [baseImage, setBaseImage] = useState(null);

  const [avtarLoader, setAvtarLoader] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value.trimStart() });
    setErrors(null);
    setLoader(false);
  };

  const isValid = () => {
    const spaceRegex = /^.+ [^ ]*$/;
    // var zipCodeRegex = /^[0-9,+]{10,}$/;

    let formData = true;
    switch (true) {
      case !data.mainColor:
        setErrors({
          mainColor: "Main color is required!",
        });
        formData = false;
        break;

      case !data.accentColor:
        setErrors({ accentColor: "Accent Color is required!" });
        formData = false;
        break;

      case !data.name:
        setErrors({
          companyName: "Company Name is required!",
        });
        formData = false;
        break;
      case !data.overview:
        setErrors({
          companyOverview: "Company Overview is required!",
        });
        formData = false;
        break;

      case !data.address:
        setErrors({
          streetAddress: "Street Address is required!",
        });
        formData = false;
        break;

      case !data.city:
        setErrors({
          city: "City is required!",
        });
        formData = false;
        break;

      case !data.state:
        setErrors({
          state: "State is required!",
        });
        formData = false;
        break;
      case !data.zipcode:
        setErrors({
          zipCode: "Zipcode is required!",
        });
        formData = false;
        break;
      case !preview:
        setErrors({ image: "Please Select Company logo!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    if (!file) {
      setAvtarLoader(false);
    } else {
      setAvtarLoader(true);
      var allowedExtensions = /[\/.](jpg|jpeg|png)$/i;

      if (!allowedExtensions.exec(file.type)) {
        setAvtarLoader(false);
        toast.error(
          "Invalid file type, Please upload only jpg, png file type!"
        );
        return;
      }
      var file1 = new File([file], "name.png", {
        type: "image/png",
      });
      const formData = new FormData();
      formData.append("image", file1);

      setAvtarLoader(true);
      setErrors(null);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      const res = await userImageUploadApi(formData);
      if (res?.data?.code === 200) {
        setdata({ ...data, logo: res.data.data });
        setAvtarLoader(false);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setAvtarLoader(false);
        setErrors(null);
      }
    }
  };

  useEffect(() => {
    getCompanyDetail();
  }, []);

  const getCompanyDetail = async () => {
    const res = await companyDetailApi();
    if (res?.data?.code === 200) {
      setdata(res.data.data);
      setBaseImage(res.data.data?.logo);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      // toast.error(res.data.message);
      setLoader(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid()) {
      setLoader(true);
      const obj = {
        ...data,
        logo: data.logo,
      };
      const res = await updateCompanyDetailApi(obj);

      if (res?.data?.code === 200) {
        setLoader(false);
        // navigate("/");
        toast.success(res.data.message);
        getCompanyDetail();
        setdata({});
        setErrors(null);
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

  useEffect(() => {
    if (baseImage) imageGet();
  }, [baseImage]);
  const imageGet = async () => {
    const res = await userImageGetApi(baseImage);
    if (res?.data?.code === 200) {
      setSelectedImage(res.data.data);
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
  };

  return (
    <div>
      <h2 className="mb-8 text-text-dark font-Karla text-[22px] font-bold">
        Company settings
      </h2>
      <div className="block">
        <form
          onSubmit={
            !loader
              ? handleSubmit
              : (event) => {
                  event.preventDefault();
                }
          }
        >
          <div className="block">
            <div className="block  mb-8">
              <div className="flex items-center space-x-4 w-[30%]">
                <div className="block relative">
                  <img
                    src={
                      preview
                        ? preview
                        : selectedImage
                        ? selectedImage
                        : CompanyLogoPic
                    }
                    className="rounded-full object-cover w-[90px] h-[90px]"
                    alt="Company Logo"
                  />
                  {avtarLoader ? 
                    <div className="absolute">
                      <box-icon
                        name="loader-circle"
                        class="fill-white flex"
                        animation="spin"
                      ></box-icon>{" "}
                    </div> : ''
                  }
                  <button type="button" className="absolute right-0 bottom-0">
                      <img src={AddIcon} alt="edit icon" />
                      <input
                        type="file"
                        accept="image/jpg,image/jpeg,image/png"
                        className="absolute w-[30px] h-[30px] right-0 bottom-0 opacity-0"
                        onChange={handleImageUpload}
                      />
                  </button>
                </div>
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.image}
                </span>
                <div className="block">
                  <h4 className="text-light-dark text-lg font-medium font-Karla tracking-[-.03em]">
                    Company <br /> Logo{" "}
                  </h4>
                </div>
              </div>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.companyLogo}
              </span>
            </div>
            <div className="flex columns-2 justify-between">
              <div className="block mb-4 w-[48%]">
                <label
                  htmlFor="mainColor"
                  className="text-lg font-Karla text-light-dark mb-1.5 block"
                >
                  Main Color
                </label>
                <div className="flex items-center rounded border border-input-border p-2.5 bg-arrowDown bg-no-repeat bg-[right_2rem_top_1.5rem]">
                  <input
                    type="color"
                    name="mainColor"
                    className="w-[65px] p-0 h-[40px] text-lg outline-none font-Karla"
                    placeholder="Starplus"
                    onChange={handleChange}
                    value={data.mainColor}
                  />
                  <span className="pl-2.5 font-Karla text-lg text-dark">
                    {data.mainColor}
                  </span>
                </div>
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.mainColor}
                </span>
              </div>
              <div className="block mb-4 w-[48%]">
                <label
                  htmlFor="accentColor"
                  className="text-lg font-Karla text-light-dark mb-1.5 block"
                >
                  Accent Color
                </label>
                <div className="flex items-center rounded border border-input-border p-2.5 bg-arrowDown bg-no-repeat bg-[right_2rem_top_1.5rem]">
                  <input
                    type="color"
                    name="accentColor"
                    className="w-[65px] p-0 h-[40px] text-lg outline-none font-Karla"
                    placeholder="Starplus"
                    onChange={handleChange}
                    value={data.accentColor}
                  />
                  <span className="pl-2.5 font-Karla text-lg text-dark">
                    {data.accentColor}
                  </span>
                </div>
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.accentColor}
                </span>
              </div>
            </div>
            <div className="block mb-4">
              <label
                htmlFor="name"
                className="text-lg font-Karla text-light-dark mb-1.5 block"
              >
                Company Name
              </label>
              <input
                type="text"
                name="name"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="Starplus"
                onChange={handleChange}
                value={data.name}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.companyName}
              </span>
            </div>
            <div className="block mb-4">
              <label
                htmlFor="overview"
                className="text-lg font-Karla text-light-dark mb-1.5 block"
              >
                Company overview
              </label>
              <textarea
                type="text"
                name="overview"
                rows="3"
                className="rounded border border-input-border w-full p-3 px-5 text-lg outline-none font-Karla"
                placeholder="Enter a brief description"
                onChange={handleChange}
                value={data.overview}
              ></textarea>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.companyOverview}
              </span>
            </div>
            <div className="block mb-4">
              <label
                htmlFor="address"
                className="text-lg font-Karla text-light-dark mb-1.5 block"
              >
                Street address
              </label>
              <input
                type="text"
                name="address"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="Enter Address"
                onChange={handleChange}
                value={data.address}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.streetAddress}
              </span>
            </div>
            <div className="block mb-4">
              <label
                htmlFor="city"
                className="text-lg font-Karla text-light-dark mb-1.5 block"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="Houston"
                onChange={handleChange}
                value={data.city}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.city}
              </span>
            </div>
            <div className="flex columns-2 justify-between">
              <div className="block mb-4 w-[48%]">
                <label
                  htmlFor="state"
                  className="text-lg font-Karla text-light-dark mb-1.5 block"
                >
                  State
                </label>
                <select
                  name="state"
                  id="state"
                  onChange={handleChange}
                  value={data.state}
                  className="w-full h-[60px] border border-input-border cursor-pointer text-light-dark text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select State</option>
                  <option value="US">US</option>
                  <option value="CA">California</option>
                  <option value="FR">Florida</option>
                  <option value="DE">Delaware</option>
                </select>
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.state}
                </span>
              </div>
              <div className="block mb-4 w-[48%]">
                <label
                  htmlFor="zipcode"
                  className="text-lg font-Karla text-light-dark mb-1.5 block"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  maxLength={8}
                  name="zipcode"
                  className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                  placeholder="77336"
                  onChange={handleChange}
                  value={data.zipcode}
                />
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.zipCode}
                </span>
              </div>
            </div>
            <div className="flex justify-end mb-4">
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
                    Save changes
                  </>
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySetting;
