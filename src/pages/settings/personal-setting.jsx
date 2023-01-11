import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassApi,
  userImageGetApi,
  userImageUploadApi,
  userUpdateApi,
} from "../../Api/user";
import UserProfile from "./../../assets/images/user.webp";
import EditIcon from "./../../assets/images/edit-icon.svg";
import toast from "toastr";
import { login } from "../redux/user";
import { useNavigate } from "react-router-dom";
import ResetUserPassword from "../../components/modals/reset-user-pasword";
import S3 from "aws-s3";
import { useEffect } from "react";

window.Buffer = window.Buffer || require("buffer").Buffer;
const config = {
  bucketName: "eminence-tech",
  dirName: "users",
  region: "us-east-1",
  accessKeyId: "AKIAR24QKRRDUW7TQPH7",
  secretAccessKey: "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",
};
const S3Client = new S3(config);

const PersonalSetting = () => {
  const [open, setOpen] = useState(false);
  toast.options = { preventDuplicates: true };
  const userData = useSelector((state) => state.user.user);
  const [errors, setErrors] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phoneNumber: userData.mobile_phone,
    profile_image: userData.profile_image,
  });

  const [resetPass, setResetPass] = useState({});
  const [avtarLoader, setAvtarLoader] = useState(false);
  const [preview, setPreview] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value.trimStart() });
    setErrors(null);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegex = /^[0-9,+]{10,}$/;

    let formData = true;
    switch (true) {
      case !data.firstName:
        setErrors({ firstName: "First Name is required!" });
        formData = false;
        break;
      case !data.lastName:
        setErrors({ lastName: "Last Name  is required!" });
        formData = false;
        break;
      case !data.phoneNumber:
        setErrors({ phoneNumber: "Phone Number  is required!" });
        formData = false;
        break;
      case data.phoneNumber && !phoneRegex.test(data.phoneNumber):
        setErrors({ phoneNumber: "Please enter valid mobile phone!" });
        formData = false;
        break;
      case !data.email:
        setErrors({ email: "Email is required!" });
        formData = false;
        break;

      case data.email && !emailReg.test(data.email):
        setErrors({ email: "Please enter Valid Email Address!" });
        formData = false;
        break;
      // case !selectedImage:
      //   setErrors({ image: "Please Select an Image!" });
      //   formData = false;
      //   break;

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
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        mobile_phone: data.phoneNumber.trim(),
        profile_image: data.profile_image && data.profile_image,
      };
      const res = await userUpdateApi(obj);
      if (res?.data?.code === 200) {
        setLoader(false);
        navigate("/");
        toast.success("Profile Updated Successfully");

        localStorage.setItem("userData", JSON.stringify(res.data.data));
        dispatch(login(res.data.data));
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

  console.log(userData, "userData");

  useEffect(() => {
    if (userData.profile_image) imageGet();
  }, [userData.profile_image]);
  const imageGet = async () => {
    const res = await userImageGetApi(userData.profile_image);
    if (res?.data?.code === 200) {
      setSelectedImage(res.data.data);
      const obj = {
        ...userData,
        display_image: res.data.data,
      };
      dispatch(login(obj));
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

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
    setErrors(null);
  };

  const onOpenModal = () => {
    setOpen(true);
    setErrors(null);
    setResetPass({});
  };
  const onCloseModal = () => {
    setOpen(false);
    setErrors(null);
    setResetPass({});
  };

  const handleResetChange = (e) => {
    setResetPass({ ...resetPass, [e.target.name]: e.target.value.trimStart() });
    setErrors(null);
  };

  const isResetValid = () => {
    let formData = true;
    switch (true) {
      case !resetPass.currentPassword:
        setErrors({ currentPassword: "Current Password is required!" });
        formData = false;
        break;
      case resetPass.currentPassword.length < 8:
        setErrors({
          currentPassword:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case !resetPass.newPassword:
        setErrors({ newPassword: "New Password is required!" });
        formData = false;
        break;
      case resetPass.newPassword.length < 8:
        setErrors({
          newPassword:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case !resetPass.confirmPassword:
        setErrors({ confirmPassword: "Confirm Password is required!" });
        formData = false;
        break;

      case resetPass.confirmPassword.length < 8:
        setErrors({
          confirmPassword:
            "Password should be at least greater than or equal to 8 characters!",
        });
        formData = false;
        break;

      case resetPass.newPassword !== resetPass.confirmPassword:
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

  const handleSubmitReset = async (e) => {
    e.preventDefault();
    if (isResetValid()) {
      setLoader(true);
      const obj = {
        oldPassword: resetPass.currentPassword
          ? resetPass.currentPassword.trim()
          : "",
        newPassword: resetPass.newPassword ? resetPass.newPassword.trim() : "",
      };
      const res = await resetPassApi(obj);
      if (res?.data?.code === 200) {
        setErrors(null);
        toast.success("Password Updated Successfully");
        setLoader(false);
        setOpen(false);
        setResetPass({});
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
      var file1 = new File([file], Date.now() + "name.png", {
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
        setData({ ...data, profile_image: res.data.data });
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

  return (
    <div className="block h-full">
      <h1 className="font-Karla text-text-dark text-xl font-bold tracking-[-0.03em] mb-8">
        Personal account settings
      </h1>
      <div className="flex min-h-[calc(100%-60px)] p-10 bg-white">
        <form
          className="w-full flex flex-wrap items-between"
          onSubmit={
            !loader
              ? handleSubmit
              : (event) => {
                event.preventDefault();
              }
          }
        >
          <div className="flex flex-wrap w-full justify-between">
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="firstName"
                className="text-base font-Karla text-light-dark font-medium block mb-1"
              >
                First name
              </label>
              <input
                type="text"
                name="firstName"
                className="rounded border border-input-border tracking-[-.03em] w-full p-3 px-4 outline-none font-Karla"
                placeholder="First Name"
                value={data.firstName}
                onChange={handleChange}
                maxLength={15}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.firstName}
              </span>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="lastName"
                className="text-base font-Karla text-light-dark font-medium block mb-1"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                className="rounded border border-input-border tracking-[-.03em] w-full p-3 px-4 outline-none font-Karla"
                placeholder="Last name"
                value={data.lastName}
                onChange={handleChange}
                maxLength={15}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.lastName}
              </span>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <div className="block relative">
                <img
                  src={
                    preview
                      ? preview
                      : selectedImage
                        ? `${selectedImage}`
                        : UserProfile
                  }
                  alt="profile avtar"
                  className="rounded-full w-[90px] h-[90px]"
                />
                {!avtarLoader ?
                  <div className="absolute">
                    <box-icon
                      name="loader-circle"
                      class="fill-white flex"
                      animation="spin"
                    ></box-icon>{" "}
                  </div> : ''
                }
                <button type="button" className="absolute bottom-0 left-16">
                  <img src={EditIcon} alt="edit icon" />
                  <input
                    type="file"
                    accept="image/jpg,image/jpeg,image/png"
                    className="absolute w-[30px] h-[30px] right-0 bottom-0 opacity-0"
                    onChange={handleImageUpload}
                  />
                </button>
              </div>{" "}
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.image}
              </span>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="phoneNumber"
                className="text-base font-Karla text-light-dark font-medium block mb-1"
              >
                Phone number
              </label>
              <input
                type="text"
                name="phoneNumber"
                className="rounded border border-input-border tracking-[-.03em] w-full p-3 px-4 outline-none font-Karla"
                placeholder="Phone number"
                maxLength={15}
                value={data.phoneNumber}
                onChange={handleChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.phoneNumber}
              </span>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="email"
                className="text-base font-Karla text-light-dark tracking-[-.03em] font-medium block mb-1"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                className="rounded tracking-[-.03em] border border-input-border w-full p-3 px-4 outline-none font-Karla"
                placeholder="Email"
                value={data.email}
                disabled
                onChange={handleChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.email}
              </span>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4"></div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="password"
                className="text-base font-Karla text-light-dark font-medium block mb-1"
              >
                Password
              </label>
              <button
                type="button"
                onClick={onOpenModal}
                className="text-primary text-sm bg-white border border-primary h-10 tracking-[-.03em] rounded-md px-3.5"
              >
                Reset user password
              </button>
            </div>
          </div>
          <div className="flex justify-end items-end w-full">
            <div className="d-block mr-3">
              <button
                type="button"
                onClick={handleCancel}
                className="text-primary text-lg tracking-[-.03em] font-bold bg-white border-primary h-14 border-2 rounded-md px-6 py-2"
              >
                Cancel
              </button>
            </div>
            <div type="submit" className="d-block">
              <button
                disabled={!avtarLoader ? false : true}
                className="text-white flex items-center font-bold tracking-[-.03em] text-lg bg-primary border h-14 rounded-md px-6 py-2"
              >
                {loader ? (
                  <>
                    <box-icon
                      name="loader-circle"
                      class="fill-white mr-2"
                      animation="spin"
                    ></box-icon>{" "}
                    Save Changes
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ResetUserPassword
        setOpen={setOpen}
        open={open}
        resetPass={resetPass}
        handleResetChange={handleResetChange}
        handleSubmitReset={handleSubmitReset}
        errors={errors}
        onCloseModal={onCloseModal}
        loader={loader}
      />
    </div>
  );
};

export default PersonalSetting;
