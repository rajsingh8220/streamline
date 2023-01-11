import React from "react";
import EyeIcon from "./../../../assets/icons/eye-icon.svg";
import CrossIcon from "./../../../assets/icons/cross-icon.svg";
import { useState } from "react";
import UserProfile from "./../../../assets/images/user.webp";
import InviteNewUser from "../../modals/invite-new-user";
import { useEffect } from "react";
import { getRolesApi } from "../../../Api/permissions";
import {
  getFilterInviteMemberApi,
  getInviteMemberApi,
  inviteMemberApi,
  userUpdateByIdApi,
} from "../../../Api/user";
import toast from "toastr";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../pages/redux/user";
import RoleSelect from "./roleSelect";
import DeleteModal from "../../modals/deleteConfirmation";
import GlobalUserDetails from "./globalUserDetails";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";

const GlobalUser = ({ open, setOpen, setShowUserDetail, showUserDetail }) => {
  toast.options = { preventDuplicates: true };
  const [inviteDetails, setInviteDetails] = useState({});
  const [filter, setFilter] = useState({});
  const [rolesData, setRolesData] = useState([]);
  const [roleMessageValue, setMessageRoleValue] = useState("");
  const [roleContactValue, setContactRoleValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 10;

  const handleOpenDetails = (val) => {
    setShowUserDetail(true);
    setInviteDetails(val);
  };
  const [contactRoles, setContactRoles] = useState([]);
  const [messageRoles, setMessageRoles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataValue, setDataValue] = useState({});

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
        setContactRoleValue("");
      } else {
        setInviteData({ ...inviteData, [e.target.name]: !inviteData.contact });
      }
    else if (e.target.name === "message")
      if (inviteData.message) {
        setInviteData({ ...inviteData, messageRole: "", message: false });
        setMessageRoleValue("");
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

  function validateEmails(string) {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = string.replace(/\s/g, "").split(",");
    for (var i = 0; i < result.length; i++) {
      if (!regex.test(result[i])) {
        return false;
      }
    }
    return true;
  }

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !inviteData.email:
        setErrors({ email: "Email is required!" });
        formData = false;
        break;

      case inviteData.email && !validateEmails(inviteData.email):
        setErrors({
          email: "Please Enter Valid Email Address!",
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

  const onCloseModal = () => {
    setOpen(false);
    setLoader(false);
    setErrors(null);
    setInviteData({});
  };
  const onDeleteClose = () => {
    setOpenDelete(false);
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
        toast.success(res.data.message);
        setLoader(false);
        setOpen(false);
        setLoader(false);
        setErrors(null);
        setInviteData({});
        getInviteMember();
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

      var a = res.data?.data?.contact;
      var b = res.data?.data?.message;
      var myFinalArray = a.concat(b);

      const key = "role";

      const arrayUniqueByKey = [
        ...new Map(myFinalArray.map((item) => [item[key], item])).values(),
      ];

      setRolesData(arrayUniqueByKey);

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

  const handleOpenDelete = (val) => {
    setOpenDelete(true);
    setDataValue(val);
  };
  const handleDeleteInvite = async () => {
    setLoader(true);
    const res = await userUpdateByIdApi(dataValue._id, {
      inviteStatus: "suspended",
    });
    if (res.data.code === 200) {
      setLoader(false);
      toast.success(res.data.message);
      setOpenDelete(false);
      getInviteMember();
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

  const handleFilterChange = async (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const applyFilter = async () => {
    if (filter.search || filter.status || filter.role || filter.module) {
      setLoader(true);
      const res = await getFilterInviteMemberApi(
        filter.search ? filter.search : "",
        filter.status ? filter.status : "",
        filter.role ? filter.role : "",
        filter.module ? filter.module : ""
      );
      if (res?.data?.code === 200) {
        setInviteList(res.data.data);
        setLoader(false);
      }
    } else {
      getInviteMember();
    }
  };

  useEffect(() => {
    applyFilter();
  }, [filter, filter.search, filter.status, filter.role, filter.module]);

  return (
    // <>
    //   {inviteData.map((val) => {
    <div className="block">
      {showUserDetail ? (
        <GlobalUserDetails
          inviteDetails={inviteDetails}
          setShowUserDetail={setShowUserDetail}
          messageRoles={messageRoles}
          contactRoles={contactRoles}
          setInviteDetails={setInviteDetails}
          getInviteMember={getInviteMember}
          inviteData={inviteData}
          setInviteData={setInviteData}
          handleInviteChange={handleInviteChange}
          setMessageRoleValue={setMessageRoleValue}
          roleMessageValue={roleMessageValue}
          setContactRoleValue={setContactRoleValue}
          roleContactValue={roleContactValue}
        />
      ) : (
        <>
          <div className="flex items-center justify-between columns-2 mb-4">
            <div className="block w-[30%]">
              <input
                type="text"
                name="search"
                className="rounded border border-input-border2 h-[35px] text-[13px] w-full py-3 px-5 outline-none font-Karla"
                placeholder="Search"
                value={filter.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="flex w-[65%] justify-end">
              <select
                id="filterStatus"
                name="status"
                value={filter.status}
                onChange={handleFilterChange}
                className="min-w-[151px] mr-2 border border-input-border2 cursor-pointer text-light-dark text-[13px] leading-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value={""}>Filter by status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="suspended">Suspended</option>
              </select>
              <select
                id="filterRole"
                name="role"
                value={filter.role}
                onChange={handleFilterChange}
                className="min-w-[151px] mr-2 border border-input-border2 cursor-pointer text-light-dark text-[13px] leading-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Filter by role</option>
                {rolesData &&
                  rolesData.map((item) => {
                    return <option value={item.role}>{item.role}</option>;
                  })}
              </select>
              <select
                id="filterServices"
                name="module"
                value={filter.module}
                onChange={handleFilterChange}
                className="min-w-[151px] border border-input-border2 cursor-pointer text-light-dark text-[13px] leading-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Filter by modules</option>
                <option value="contact">Contacts</option>
                <option value="message">Messages</option>
              </select>
            </div>
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
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      Modules
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                {inviteList && inviteList.length > 0 ? (
                  <tbody>
                    {inviteList.length > 0 &&
                      inviteList
                        .slice(
                          (currentPage - 1) * pagePostsLimit,
                          currentPage * pagePostsLimit
                        )
                        .map((val) => (
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
                                  <h5>
                                    {val?.firstName ? val?.firstName : ""}
                                  </h5>
                                  <p className="text-[11px] font-Karla text-[#777777]">
                                    {val?.email}
                                  </p>
                                </div>
                              </div>
                            </th>
                            <td className="py-4 px-6">
                              <span
                                className={`${
                                  val?.inviteStatus === "pending"
                                    ? "bg-[#F8BF2A] "
                                    : val?.inviteStatus === "suspended"
                                    ? "bg-[#777777]"
                                    : "bg-[#30E0A1]"
                                } text-white text-xs cursor-pointer font-medium mr-2 px-2.5 py-1 rounded capitalize`}
                              >
                                {val?.inviteStatus}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <div className="block mb-2">
                                {val &&
                                val?.contactRole &&
                                val?.contactRole.length > 0 ? (
                                  <RoleSelect
                                    roles={contactRoles}
                                    val={val}
                                    role={"contact"}
                                    setErrors={setErrors}
                                    getInviteMember={getInviteMember}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="block mb-2">
                                {val && val?.messageRole?.length > 0 ? (
                                  <RoleSelect
                                    roles={messageRoles}
                                    val={val}
                                    role={"message"}
                                    setErrors={setErrors}
                                    getInviteMember={getInviteMember}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="block">
                                <ul>
                                  {val &&
                                  val?.contactRole &&
                                  val?.contactRole.length > 0 ? (
                                    <li className="mb-2 text-light-dark tracking-[-.03em] text-sm">
                                      Contacts
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                  {val &&
                                  val?.messageRole &&
                                  val?.messageRole.length > 0 ? (
                                    <li className="mb-2 text-light-dark tracking-[-.03em] text-sm">
                                      Messaging
                                    </li>
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() => handleOpenDetails(val)}
                                >
                                  <img
                                    src={EyeIcon}
                                    alt="eye Icon"
                                    className="w-5"
                                  />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleOpenDelete(val)}
                                >
                                  {" "}
                                  <img
                                    src={CrossIcon}
                                    alt="cross Icon"
                                    className="ml-3 w-5"
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                ) : loader ? (
                  <box-icon
                    name="loader-circle"
                    class="fill-white mr-2"
                    animation="spin"
                  ></box-icon>
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={5}>
                        <span className="flex justify-center p-10 w-full">
                          No Data Found
                        </span>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
              <Pagination
                currentPage={currentPage}
                itemsPerPage={pagePostsLimit}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                totalItems={inviteList.length}
                pageNeighbours={2}
              />
            </div>
            <InviteNewUser
              setOpen={setOpen}
              open={open}
              contactRoles={contactRoles}
              messageRoles={messageRoles}
              handleInviteChange={handleInviteChange}
              loader={loader}
              handleInviteSubmit={handleInviteSubmit}
              errors={errors}
              onCloseModal={onCloseModal}
              inviteData={inviteData}
            />
            <DeleteModal
              open={openDelete}
              onCloseModal={onDeleteClose}
              handleDeleteRole={handleDeleteInvite}
              loader={loader}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalUser