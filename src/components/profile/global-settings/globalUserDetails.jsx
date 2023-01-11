import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userUpdateByIdApi } from "../../../Api/user";
import toast from "toastr";
import { login } from "../../../pages/redux/user";
import ArrowRight from "./../../../assets/icons/right-arrow.svg";
import ResetUserPassword from "../../modals/reset-user-pasword";

const GlobalUserDetails = ({
  inviteDetails,
  getInviteMember,
  setOpen,
  setInviteDetails,
  contactRoles,
  messageRoles,
  inviteData,
  handleInviteChange,
  setInviteData,
  setMessageRoleValue,
  roleMessageValue,
  setContactRoleValue,
  roleContactValue,
  setShowUserDetail,
}) => {
  toast.options = { preventDuplicates: true };
  const [openResetPassword, setOpenResetPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const onOpenReSetPasswordModal = () => setOpenResetPassword(true);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState(null);

  console.log(inviteDetails, "inviteDetails-111111111111");

  //   useEffect(() => {
  //     console.log(inviteDetails.contactRole, "inviteDetails.contactRole");
  //     if (inviteDetails.contactRole.length > 0) {
  //       //   setInviteData("contact");
  //       console.log(inviteDetails.contactRole, "inviteDetails.contactRole1111");

  //       setInviteData({ ...inviteData, contact: true });
  //     }
  //   }, [inviteDetails, inviteDetails.contactRole]);

  useEffect(() => {
    if (
      inviteDetails.messageRole.length > 0 ||
      inviteDetails.contactRole.length > 0
    ) {
      setInviteData({
        ...inviteData,
        message: inviteDetails.messageRole.length > 0 ? true : false,
        contact: inviteDetails.contactRole.length > 0 ? true : false,
      });
    }
  }, [inviteDetails, inviteDetails.messageRole, inviteDetails.contactRole]);

  const onCloseModal = () => {
    setShowUserDetail(false);
    setErrors(null);
    setLoader(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (inviteDetails && inviteDetails?.contactRole)
      setContactRoleValue(
        inviteDetails?.contactRole && inviteDetails?.contactRole[0]?._id
      );
  }, [inviteDetails, inviteDetails?.contactRole]);

  useEffect(() => {
    if (inviteDetails && inviteDetails?.messageRole)
      setMessageRoleValue(
        inviteDetails?.messageRole && inviteDetails?.messageRole[0]?._id
      );
  }, [inviteDetails, inviteDetails?.messageRole]);
  console.log(inviteData, "inviteData", inviteDetails);

  useEffect(() => {
    setStatus(inviteDetails?.inviteStatus);
  }, [inviteDetails?.inviteStatus]);

  const handleContactValueChange = (e) => {
    setContactRoleValue(e.target.value);

    setErrors(null);
  };

  const handleMessageValueChange = (e) => {
    setMessageRoleValue(e.target.value);
    setErrors(null);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setErrors(null);
  };

  const handleDetailsChange = (e) => {
    setInviteDetails({ ...inviteDetails, [e.target.name]: e.target.value });
    setErrors(null);
  };

  const isValid = () => {
    var phoneRegex = /^[0-9,+]{10,}$/;
    let formData = true;
    switch (true) {
      case inviteDetails.mobile_phone &&
        !phoneRegex.test(inviteDetails.mobile_phone):
        setErrors({ mobile_phone: "Please enter valid mobile phone!" });
        formData = false;
        break;
      case !inviteData.contact && !inviteData.message:
        setErrors({ module: "Please select at least one module!" });
        formData = false;
        break;

      case inviteData.contact && !roleContactValue:
        setErrors({ contact: "Please select contact role!" });
        formData = false;
        break;

      case inviteData.message && !roleMessageValue:
        setErrors({ message: "Please select message role!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };
  console.log(status, "status");
  const handleSubmit = async () => {
    if (isValid()) {
      setLoader(true);
      const obj = {};
      obj.contactRole = roleContactValue ? roleContactValue : null;
      obj.messageRole = roleMessageValue ? roleMessageValue : null;
      obj.inviteStatus = status;
      obj.firstName = inviteDetails.firstName;
      obj.lastName = inviteDetails.lastName;
      obj.mobile_phone = inviteDetails.mobile_phone;

      const res = await userUpdateByIdApi(inviteDetails?._id, obj);
      if (res?.data?.code === 200) {
        getInviteMember();
        toast.success(res.data.message);
        setLoader(false);
        setErrors(null);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        setLoader(false);
        toast.error(res.data.message);
      }
    }
  };

  return (
    <div className="flex columns-2 justify-between">
      <div className="md:w-[66%]">
        <div className="block bg-white border border-light-border2- mb-5 rounded-lg px-8 py-9">
          <div className="block relative">
            <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
              User info
            </h1>
            <div className="block mb-4">
              <label
                htmlFor="userStatus"
                className="text-base font-medium font-Karla text-light-dark mb-1 block"
              >
                User Status
              </label>
              {inviteDetails.inviteStatus == "pending" ? (
                <select
                  id="inviteStatus"
                  // name="inviteStatus"
                  className="max-w-[168px] w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>{" "}
                  <option value="suspended">Suspended</option>
                </select>
              ) : (
                <select
                  id="inviteStatus"
                  // name="inviteStatus"
                  className="max-w-[168px] w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <option value="active">Active</option>{" "}
                  <option value="suspended">Suspended</option>
                </select>
              )}
            </div>
            <div className="flex columns-2 justify-between mb-4">
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="firstName"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                  maxLength={15}
                  value={inviteDetails.firstName}
                  onChange={handleDetailsChange}
                />
              </div>
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="lastName"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                  maxLength={15}
                  value={inviteDetails.lastName}
                  onChange={handleDetailsChange}
                />
              </div>
            </div>
            <div className="flex columns-2 justify-between mb-4">
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="contactEmail"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Contact Email
                </label>
                <input
                  type="email"
                  name="email"
                  disabled={true}
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                  value={inviteDetails.email}
                  //   onChange={handleDetailsChange}
                />
              </div>
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="phone"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Phone (optional)
                </label>
                <input
                  type="text"
                  name="mobile_phone"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                  maxLength={15}
                  value={inviteDetails.mobile_phone}
                  onChange={handleDetailsChange}
                />
                <span className="form-error text-error text-sm font-normal">
                  {errors && errors.mobile_phone}
                </span>
              </div>
            </div>
            <div className="d-block w-[30%] min-w-[30%] max-w-[30%] mb-4">
              <label
                htmlFor="password"
                className="text-base font-Karla text-light-dark font-medium block mb-1"
              >
                Password
              </label>
              <button
                type="button"
                onClick={onOpenReSetPasswordModal}
                className="text-primary text-sm bg-white border border-primary h-10 tracking-[-.03em] rounded-md px-3.5"
              >
                Reset user password
              </button>
            </div>
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-md mr-2 h-[56px] text-lg bg-white flex items-center tracking-[-.03em] font-bold border-primary text-primary border-2 py-5 px-6 font-Karla"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={
                  !loader ? handleSubmit : (event) => event.preventDefault()
                }
                className="rounded-md font-bold h-[56px] flex items-center tracking-[-.03em] justify-center text-lg bg-primary text-white py-5 px-6 font-Karla"
              >
                {loader ? (
                  <>
                    <box-icon
                      name="loader-circle"
                      class="fill-white mr-2"
                      animation="spin"
                    ></box-icon>{" "}
                    Save
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="block bg-white border border-light-border2 mb-5 rounded-lg px-8 py-9">
          <div className="block relative">
            <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
              Services & roles
            </h1>
            <div className="block">
              <h4 className="text-dark text-lg tracking-[-.03em] font-Karla font-medium mb-5">
                Select permissions for this role
              </h4>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.module}
              </span>
              <div className="block mb-3">
                <ul className="block">
                  {/* <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="manage_module_settings"
                          id="manage_module_settings"
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Process Boards
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role"
                          name="role"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="rola">Module Member</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="propertiesPermission"
                          id="propertiesPermission"
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Properties
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role2"
                          name="role2"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="rola">Module Member</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="dealsPermission"
                          id="dealsPermission"
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Deals
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role3"
                          name="role3"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="rola">Module Member</option>
                        </select>
                      </div>
                    </div>
                  </li> */}

                  <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="contact"
                          id="contactsPermission"
                          checked={inviteData.contact}
                          onClick={handleInviteChange}
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Contacts
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role4"
                          name="contactRole"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={roleContactValue}
                          defaultValue={roleContactValue}
                          onChange={handleContactValueChange}
                          //   disabled={roleContactValue === "" ? true : false}
                          disabled={!inviteData.contact}
                        >
                          <option value="">Select Role</option>

                          {contactRoles.length > 0 &&
                            contactRoles.map((subItem, index) => {
                              return (
                                <>
                                  <option value={subItem._id}>
                                    {subItem.role}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <span className="form-error text-error text-sm font-normal">
                      {errors && errors.contact}
                    </span>
                  </li>
                  <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="message"
                          id="messagingPermission"
                          checked={inviteData.message}
                          onClick={handleInviteChange}
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Messaging
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role5"
                          name="messageRole"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={roleMessageValue}
                          defaultValue={roleMessageValue}
                          onChange={handleMessageValueChange}
                          //   disabled={roleMessageValue === "" ? true : false}
                          disabled={!inviteData.message}
                        >
                          <option value="">Select Role</option>

                          {messageRoles.length > 0 &&
                            messageRoles.map((subItem, index) => {
                              return (
                                <>
                                  <option value={subItem._id}>
                                    {subItem.role}
                                  </option>
                                </>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <span className="form-error text-error text-sm font-normal">
                      {errors && errors.message}
                    </span>
                  </li>
                  {/* <li className="block cursor-pointer mb-5">
                    <div className="flex w-full columns-2 justify-between items-center">
                      <div className="flex w-[55%] items-center">
                        <input
                          type="checkbox"
                          name="reportingPermission"
                          id="reportingPermission"
                        />
                        <label
                          htmlFor="manageModuleSetting"
                          className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                        >
                          Reporting
                        </label>
                      </div>
                      <div className="flex w-[40%] items-center justify-end">
                        <span className="font-dark mr-3 text-[11px] font-Karla font-bold">
                          ROLE
                        </span>
                        <select
                          id="role6"
                          name="role6"
                          className="min-w-[170px] h-[30px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-1 px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="rola">Module Member</option>
                        </select>
                      </div>
                    </div>
                  </li> */}
                </ul>
              </div>
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="rounded-md mr-2 h-[56px] text-lg bg-white flex items-center tracking-[-.03em] font-bold border-primary text-primary border-2 py-5 px-6 font-Karla"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={
                    !loader ? handleSubmit : (event) => event.preventDefault()
                  }
                  className="rounded-md font-bold h-[56px] flex items-center tracking-[-.03em] justify-center text-lg bg-primary text-white py-5 px-6 font-Karla"
                >
                  {loader ? (
                    <>
                      <box-icon
                        name="loader-circle"
                        class="fill-white mr-2"
                        animation="spin"
                      ></box-icon>{" "}
                      Save
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="block bg-white border border-light-border2 rounded-lg px-8 py-9">
          <div className="block relative">
            <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
              Payment Settings (deals)
            </h1>
            <div className="block w-[48%] mb-4">
              <label
                htmlFor="userStatus"
                className="text-base font-medium font-Karla text-light-dark mb-1 block"
              >
                Default Selling Commission Amount and Type
              </label>
              <div className="flex columns-2 justify-between">
                <input
                  type="text"
                  name="point"
                  className="rounded border w-[35%] border-input-border p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder="2.5"
                />
                <select
                  id="percentage"
                  name="percentage"
                  className="w-[60%] h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="Percentage (%)">Percentage (%)</option>
                </select>
              </div>
            </div>
            <div className="flex columns-2 justify-between mb-4">
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="accountOwnerName"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Account Owner Name (optional)
                </label>
                <input
                  type="text"
                  name="accountOwnerName"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                />
              </div>
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="bankName"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Bank Name (optional)
                </label>
                <input
                  type="text"
                  name="bankName"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex columns-2 justify-between mb-4">
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="accountNumber"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Account Number (optional)
                </label>
                <input
                  type="email"
                  name="accountNumber"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                />
              </div>
              <div className="block w-[48%] mb-2 relative">
                <label
                  htmlFor="routingNumber"
                  className="text-base font-medium font-Karla text-light-dark mb-1 block"
                >
                  {" "}
                  Routing Number (optional)
                </label>
                <input
                  type="text"
                  name="routingNumber"
                  className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                  placeholder=""
                />
              </div>
            </div>
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={onCloseModal}
                className="rounded-md mr-2 h-[56px] text-lg bg-white flex items-center tracking-[-.03em] font-bold border-primary text-primary border-2 py-5 px-6 font-Karla"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={
                  !loader ? handleSubmit : (event) => event.preventDefault()
                }
                className="rounded-md font-bold h-[56px] flex items-center tracking-[-.03em] justify-center text-lg bg-primary text-white py-5 px-6 font-Karla"
              >
                {loader ? (
                  <>
                    <box-icon
                      name="loader-circle"
                      class="fill-white mr-2"
                      animation="spin"
                    ></box-icon>{" "}
                    Save
                  </>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-[32%]">
        <div className="py-5 px-4 bg-white border border-light-border2 rounded">
          <h5 className="text-black font-Karla mb-4 text-sm font-bold">
            Related entities
          </h5>
          <select
            id="property"
            className="min-w-[151px] w-full  border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="property">Property</option>
          </select>
          <div className="block">
            <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
              <div className="block">
                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                  #568920
                </span>
                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                  Listing Price: $ 000,000.00
                </h4>
                <span className="font-Karla block text-sm text-light-grey">
                  Listing Price: $ 000,000.00
                </span>
                <span className="font-Karla block text-sm text-light-grey">
                  Property Type: Single Family
                </span>
              </div>
              <div className="flex justify-end w-[10%]">
                <button className="border-none">
                  <img src={ArrowRight} alt="arrow right"></img>{" "}
                </button>
              </div>
            </div>
            <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
              <div className="block">
                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                  #568920
                </span>
                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                  Listing Price: $ 000,000.00
                </h4>
                <span className="font-Karla block text-sm text-light-grey">
                  Listing Price: $ 000,000.00
                </span>
                <span className="font-Karla block text-sm text-light-grey">
                  Property Type: Single Family
                </span>
              </div>
              <div className="flex justify-end w-[10%]">
                <button className="border-none">
                  <img src={ArrowRight} alt="arrow right"></img>{" "}
                </button>
              </div>
            </div>
            <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
              <div className="block">
                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                  #568920
                </span>
                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                  Listing Price: $ 000,000.00
                </h4>
                <span className="font-Karla block text-sm text-light-grey">
                  Listing Price: $ 000,000.00
                </span>
                <span className="font-Karla block text-sm text-light-grey">
                  Property Type: Single Family
                </span>
              </div>
              <div className="flex justify-end w-[10%]">
                <button className="border-none">
                  <img src={ArrowRight} alt="arrow right"></img>{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="flex columns-2 justify-between mt-4">
            <button
              type="button"
              className="rounded-md text-sm font-bold bg-white border-primary text-primary text-left border py-2 px-4 font-Karla"
            >
              Add Property
            </button>
            <button
              type="button"
              className="rounded-md text-sm font-bold bg-white border-primary text-primary text-left border py-2 px-4 font-Karla"
            >
              View All
            </button>
          </div>
        </div>
      </div>
      {/* <ResetUserPassword
            setOpen={setOpenResetPassword}
            open={openResetPassword}
            errors={errors}
            onCloseModal={onCloseResetPasswordModal}
            loader={loader}
        /> */}
    </div>
  );
};

export default GlobalUserDetails;
