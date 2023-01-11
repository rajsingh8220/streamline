import React from "react";
import EyeIcon from "./../../assets/icons/eye-icon.svg";
import CrossIcon from "../../assets/icons/cross-icon.svg";
import { useState } from "react";
import UserProfile from "./../../assets/images/user.webp";
import { useEffect } from "react";
import { getRolesApi } from "../../Api/permissions";
import {
  getInviteMemberApi,
  inviteMemberApi,
  userUpdateByIdApi,
} from "../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../pages/redux/user";

const ContactUsers = () => { 

    toast.options = { preventDuplicates: true };
    const [contactRoles, setContactRoles] = useState([]);
    const [messageRoles, setMessageRoles] = useState([]);
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState(null);
    const [inviteData, setInviteData] = useState({
      contact: false,
      message: false,
    });
    const [inviteList, setInviteList] = useState([]);
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleInviteChange = (e) => {
      if (e.target.name === "contact")
        if (inviteData.contact) {
          setInviteData({ ...inviteData, contactRole: "", contact: false });
        } else {
          setInviteData({ ...inviteData, [e.target.name]: !inviteData.contact });
        }
      else if (e.target.name === "message")
        if (inviteData.message) {
          setInviteData({ ...inviteData, messageRole: "", message: false });
        } else {
          setInviteData({ ...inviteData, [e.target.name]: !inviteData.message });
        }
      else
        setInviteData({
          ...inviteData,
          [e.target.name]: e.target.value,
        });
      setErrors(null);
    };
  
    const isValid = () => {
      const regex = /^([a-z][a-z0-9_.]+@([a-z0-9-]+\.)+[a-z]{2,6}(,)*)+$/;
      const commaRegex = /([^,]+)/;
      let formData = true;
      switch (true) {
        case !inviteData.email:
          setErrors({ email: "Email is required!" });
          formData = false;
          break;
  
        case inviteData.email && !regex.test(inviteData.email):
          setErrors({
            email: "Please enter Valid Email Address!",
          });
          formData = false;
          break;
        case inviteData.email && !commaRegex.test(inviteData.email):
          setErrors({
            email: "Emails can be seprated with comma's (,) only!",
          });
          formData = false;
          break;
  
        case !inviteData.contact && !inviteData.message:
          setErrors({ module: "Please select at least one module!" });
          formData = false;
          break;
  
        case inviteData.contact && !inviteData.contactRole:
          setErrors({ contact: "Please select contact role!" });
          formData = false;
          break;
  
        case inviteData.message && !inviteData.messageRole:
          setErrors({ message: "Please select message role!" });
          formData = false;
          break;
  
        default:
          formData = true;
      }
      return formData;
    };
  
    const handleInviteSubmit = async (e) => {
      e.preventDefault();
      const obj = {
        email: inviteData.email ? inviteData.email.trim() : inviteData.email,
        role: "member",
      };
      if (inviteData.contactRole) obj.contactRole = inviteData.contactRole;
      if (inviteData.messageRole) obj.messageRole = inviteData.messageRole;
      if (isValid()) {
        setLoader(true);
        const res = await inviteMemberApi(obj);
        if (res.data.code === 200) {
          setErrors(null);
          toast.success(res.data.message);
          setLoader(false);
          setErrors(null);
          setInviteData({});
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
  
    useEffect(() => {
      getRoles();
    }, []);
  
    const getRoles = async () => {
      const res = await getRolesApi();
      if (res?.data?.code === 200) {
        setContactRoles(res.data?.data?.contact);
        setMessageRoles(res.data?.data?.message);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    };
  
    useEffect(() => {
      getInviteMember();
    }, []);
  
    const getInviteMember = async () => {
      const res = await getInviteMemberApi();
      if (res?.data?.code === 200) {
        setInviteList(res.data?.data);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    };
  
    const updateUserById = async (e, id, role) => {
      const obj = {};
      if (role === "contact") obj.contactRole = e.target.value;
      if (role === "message") obj.messageRole = e.target.value;
  
      const res = await userUpdateByIdApi(id, obj);
      if (res?.data?.code === 200) {
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
  
        setErrors(null);
      }
    };

  return (
    <>
    <div className='block mb-4'>
        <h2 className="text-text-dark font-Karla text-[22px] font-bold">
            All Users
        </h2>
    </div>
    <div className="block">
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-[#F0F2F6] dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 pl-3 text-blueDark text-[11px] font-bold"
                >
                  NAME / EMAIL
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 text-blueDark text-[11px] font-bold"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 text-blueDark text-[11px] font-bold"
                >
                  ROLE
                </th>
              </tr>
            </thead>
            <tbody>
              {inviteList.length > 0 &&
                inviteList.map((val) => (
                  <tr className="bg-white align-top border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 pl-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex space-x-3">
                        <div className="block w-8">
                          <img
                            src={UserProfile}
                            alt="avtar"
                            className="w-8 h-8 block rounded-full"
                          />
                        </div>
                        <div className="block">
                          <h5>{val?.firstName ? val.firstName : ""}</h5>
                          <p className="text-[11px] font-Karla text-[#777777]">
                            {val.email}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="py-4 px-6">
                      <span className="bg-[#30E0A1] text-white text-xs cursor-pointer font-medium mr-2 px-2.5 py-1 rounded ">
                        {/* Active */}
                        {val.inviteStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="block mb-2">
                        {val.contactRole.length > 0 && (
                          <select
                            id="tableROle"
                            className="min-w-[151px] h-8 p-1 px-2 border border-input-border cursor-pointer text-light-dark text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="contactRole"
                            onClick={(e) =>
                              updateUserById(e, val._id, "contact")
                            }
                            defalutValue={val.contactRole[0]._id}
                          >
                            {contactRoles.length > 0 &&
                              contactRoles.map((subItem, index) => {
                                return (
                                  <>
                                    <option key={index} value={subItem._id}>
                                      {subItem.role}
                                    </option>
                                  </>
                                );
                            })}
                          </select>
                        )}
                      </div>
                      <div className="block mb-2">
                        {val.messageRole.length > 0 && (
                          <select
                            id="tableROle"
                            className="min-w-[151px] h-8 p-1 px-2 border border-input-border cursor-pointer text-light-dark text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            name="messageRole"
                            onClick={(e) =>
                              updateUserById(e, val._id, "message")
                            }
                            value={val.messageRole[0]._id}
                          >
                            {messageRoles.length > 0 &&
                              messageRoles.map((subItem, index) => {
                                return (
                                  <>
                                    <option key={index} value={subItem._id}>
                                      {subItem.role}
                                    </option>
                                  </>
                                );
                              })}
                          </select>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
    </div>
    </>
  )
}

export default ContactUsers