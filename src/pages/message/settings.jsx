import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  createRolesApi,
  deleteRolesApi,
  getRolesApi,
  updateRolesApi,
} from "../../Api/permissions";
import Roles from "../../components/message/roles";
import ChatSettings from "../../components/message/settings";
import ChatUsers from "../../components/message/users";
import CreateNewRole from "../../components/modals/create-new-role";
import { login } from "../redux/user";
import toast from "toastr";
import DeleteModal from "../../components/modals/deleteConfirmation";
import ViewRoleDetails from "../../components/modals/viewRolesDetail";

const MessageSettings = () => {
  toast.options = { preventDuplicates: true };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openTab, setOpenTab] = React.useState(1);
  const [openCreateRole, setopenCreateRole] = useState(false);
  const [openViewRole, setopenViewRole] = useState(false);

  const [rolesData, setRolesData] = useState({});
  const [rolesPermissions, setRolesPermissions] = useState([]);
  const [rolesChannels, setRolesChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataValue, setDataValue] = useState({});
  const [openEditRole, setopenEditRole] = useState(false);
  const [duplicate, setDuplicate] = useState(false);
  const [searchState, setSearchState] = useState("");

  const onCreateRoleModal = () => {
    setopenCreateRole(true);
    setDuplicate(false);
    setopenEditRole(false);
    setErrors(null);
    setLoader(false);
    setRolesData({});
    setRolesChannels([]);
    setRolesPermissions([]);
    setSearchState("");
  };
  const onCloseRoleModal = () => {
    setopenCreateRole(false);
    setErrors(null);
    setLoader(false);
    setRolesData({});
    setRolesChannels([]);
    setRolesPermissions([]);
    setSearchState("");
  };

  const closeRoleModal = () => {
    setopenViewRole(false);
    setSearchState("");
  };

  const settingListItems = [
    { id: "1", title: "Settings" },
    { id: "2", title: "Roles" },
    { id: "3", title: "Users" },
  ];

  const handleRolesChange = (e) => {
    setRolesData({ ...rolesData, [e.target.name]: e.target.value });
    setErrors(null);
  };

  const handleRolesPChange = (e) => {
    if (rolesPermissions.includes(e.target.value)) {
      const newArray = rolesPermissions.filter((val) => val != e.target.value);
      setRolesPermissions(newArray);
    } else {
      const newArray = [...rolesPermissions, e.target.value];
      setRolesPermissions(newArray);
    }
    setErrors(null);
  };

  const handleRolesChannelChange = (e) => {
    if (rolesChannels.includes(e.target.value)) {
      const newArray = rolesChannels.filter((val) => val != e.target.value);
      setRolesChannels(newArray);
    } else {
      const newArray = [...rolesChannels, e.target.value];
      setRolesChannels(newArray);
      setErrors(null);
    }
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !rolesData.roleName:
        setErrors({ roleName: "Role Name is required!" });
        formData = false;
        break;
      case !rolesData.description:
        setErrors({ description: "Description is required!" });
        formData = false;
        break;
      case rolesPermissions.length == 0 && rolesChannels.length == 0:
        setErrors({ module_management: "Permissions are required!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const obj = {
        role: rolesData.roleName.trim(),
        description: rolesData.description.trim(),
        type: "message",
        module_management: rolesPermissions.length > 0 ? rolesPermissions : [],
        channels: rolesChannels.length > 0 ? rolesChannels : [],
      };
      setLoader(true);
      const res = await createRolesApi(obj);
      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        setErrors(null);
        setLoader(false);
        setRolesData({});
        setRolesChannels([]);
        getRoles();
        setRolesPermissions([]);
        setopenCreateRole(false);
        setSearchState("");
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
    setLoader(true);
    const res = await getRolesApi();
    if (res?.data?.code === 200) {
      setRoles(res.data?.data?.message);
      setLoader(false);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      setLoader(false);
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  const handleDeleteOpen = (item) => {
    setOpenDelete(true);
    setDataValue(item);
    setLoader(false);
  };

  const onCloseModal = () => {
    setOpenDelete(false);
    setLoader(false);
  };

  const handleDeleteRole = async () => {
    setLoader(true);
    const res = await deleteRolesApi(dataValue._id, "message");
    if (res?.data?.code === 200) {
      setLoader(false);
      setOpenDelete(false);
      getRoles();
      toast.success(res.data.message);
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

  const handleEditClick = (item) => {
    setopenCreateRole(true);
    setopenEditRole(true);
    setDuplicate(false);
    setSearchState("");
    rolesData.roleName = item.role;
    rolesData.description = item.description;
    setRolesData(rolesData);
    setDataValue(item);
    setRolesChannels(item.channels);
    setRolesPermissions(item.module_management);
  };

  const handleDuplicate = (item) => {
    setopenCreateRole(true);
    setDuplicate(true);
    setopenEditRole(false);
    setDataValue(item);
    setRolesChannels(item.channels);
    setRolesPermissions(item.module_management);
  };

  const handleViewDetails = (item) => {
    setopenViewRole(true);
    setSearchState("");
    rolesData.roleName = item.role;
    rolesData.description = item.description;
    setRolesData(rolesData);
    setDataValue(item);
    setRolesChannels(item.channels);
    setRolesPermissions(item.module_management);
  };

  const onHandleEditRole = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const obj = {
        role: rolesData.roleName.trim(),
        description: rolesData.description.trim(),
        type: "message",
        module_management: rolesPermissions.length > 0 ? rolesPermissions : [],
        channels: rolesChannels.length > 0 ? rolesChannels : [],
      };
      setLoader(true);
      const res = await updateRolesApi(dataValue._id, obj);
      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        setErrors(null);
        setLoader(false);
        setRolesData({});
        setRolesChannels([]);
        getRoles();
        setRolesPermissions([]);
        setopenCreateRole(false);
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

  const onHandleDuplicate = async (e) => {
    e.preventDefault();
    if (isValid()) {
      const obj = {
        role: rolesData.roleName.trim(),
        description: rolesData.description.trim(),
        type: "message",
        module_management: rolesPermissions.length > 0 ? rolesPermissions : [],
        channels: rolesChannels.length > 0 ? rolesChannels : [],
      };
      setLoader(true);
      const res = await createRolesApi(obj);
      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        setErrors(null);
        setLoader(false);
        setRolesData({});
        setRolesChannels([]);
        getRoles();
        setRolesPermissions([]);
        setopenCreateRole(false);
        setDuplicate(false);
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
    <div className="block">
      <div className="flex min-h-[48px] justify-between items-center columns-2">
        <h1 className="font-Karla text-text-dark text-xl mb-0 font-bold tracking-[-0.03em]">
          <Link to="/message">Messaging › </Link>
          <span className="text-primary">
            {settingListItems && settingListItems[openTab - 1].title}
          </span>
        </h1>
        {openTab === 2 && (
          <button
            type="button"
            onClick={onCreateRoleModal}
            className="rounded-md font-medium text-sm bg-primary border-primary text-white text-left border-2 py-2 px-4 font-Karla"
          >
            + Create new role
          </button>
        )}
      </div>
      <div className="w-full flex justify-between mt-4">
        <ul className="mb-0 list-none w-[24%] pb-4 mt-4" role="tablist">
          {settingListItems.map((item, index) => {
            return (
              <li
                key={index}
                className="-mb-px mr-2 last:mr-0 flex-auto text-left"
              >
                <Link
                  className={
                    "text-sm font-medium font-Karla px-5 py-3 rounded block leading-normal " +
                    (openTab === index + 1
                      ? "text-primary bg-primary/10"
                      : "text" + "-primary" + " bg-transparent")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(index + 1);
                  }}
                  data-toggle="tab"
                  to={`#link${item.id}`}
                  role="tablist"
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div
          className={
            openTab === 2
              ? "relative w-[74%] flex flex-col mt-5 min-w-0 break-words mb-6 rounded"
              : "relative w-[74%] flex flex-col mt-5 min-w-0 break-words border border-module-border bg-white mb-6 rounded"
          }
        >
          <div
            className={openTab === 2 ? "p-0 flex-auto" : "py-8 px-9 flex-auto"}
          >
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <ChatSettings />
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {roles && roles.length > 0 ? (
                  <div className="flex justify-between flex-wrap">
                    {roles &&
                      roles.map((val, index) => {
                        return (
                          <Roles
                            val={val}
                            index={index}
                            handleDeleteOpen={handleDeleteOpen}
                            handleEditClick={handleEditClick}
                            handleDuplicate={handleDuplicate}
                            handleViewDetails={handleViewDetails}
                          />
                        );
                      })}
                  </div>
                ) : loader ? (
                  <div className="mt-2 p-10 bg-white flex justify-center items-center">
                    <box-icon
                      name="loader-circle"
                      class="fill-black"
                      animation="spin"
                    ></box-icon>
                  </div>
                ) : (
                  <span className="mt-2 p-10 bg-white flex justify-center items-center rounded">
                    No Roles Found
                  </span>
                )}
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                <ChatUsers />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateNewRole
        openCreateRole={openCreateRole}
        loader={loader}
        onCloseRoleModal={onCloseRoleModal}
        handleRolesChange={handleRolesChange}
        rolesData={rolesData}
        handleRolesPChange={handleRolesPChange}
        rolesPermissions={rolesPermissions}
        handleCreateRole={handleCreateRole}
        handleRolesChannelChange={handleRolesChannelChange}
        errors={errors}
        openEditRole={openEditRole}
        rolesChannels={rolesChannels}
        onHandleEditRole={onHandleEditRole}
        duplicate={duplicate}
        onHandleDuplicate={onHandleDuplicate}
        setSearchState={setSearchState}
        searchState={searchState}
      />
      <DeleteModal
        open={openDelete}
        onCloseModal={onCloseModal}
        handleDeleteRole={handleDeleteRole}
        loader={loader}
      />
      <ViewRoleDetails
        openViewRole={openViewRole}
        onCloseRoleModal={closeRoleModal}
        rolesData={rolesData}
        rolesPermissions={rolesPermissions}
        rolesChannels={rolesChannels}
        setSearchState={setSearchState}
        searchState={searchState}
      />
    </div>
  );
};

export default MessageSettings;
