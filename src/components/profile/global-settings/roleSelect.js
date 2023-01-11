import React, { useEffect, useState } from "react";
import { userUpdateByIdApi } from "../../../Api/user";
import toast from "toastr";
import { login } from "../../../pages/redux/user";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function RoleSelect({
  val,
  roles,
  role,
  setErrors,
  getInviteMember,
}) {
  toast.options = { preventDuplicates: true };
  const [roleMessageValue, setMessageRoleValue] = useState("");
  const [roleContactValue, setContactRoleValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setContactRoleValue(val && val.contactRole && val.contactRole[0]?._id);
  }, [val, val.contactRole]);
  useEffect(() => {
    setMessageRoleValue(val && val.messageRole && val.messageRole[0]?._id);
  }, [val, val.messageRole]);

  const updateUserById = async (e, id, role) => {
    const obj = {};
    if (role === "contact") obj.contactRole = e.target.value;
    if (role === "message") obj.messageRole = e.target.value;

    if (role === "contact") setContactRoleValue(e.target.value);
    if (role === "message") setMessageRoleValue(e.target.value);

    const res = await userUpdateByIdApi(id, obj);
    if (res?.data?.code === 200) {
      setErrors(null);
      toast.success(res.data.message);
      setContactRoleValue(res.data.obj?.contactRole);
      setMessageRoleValue(res.data.obj?.messageRole);
      getInviteMember();
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
    <select
      id="tableROle"
      className="min-w-[151px] h-8 p-1 px-2 border border-input-border cursor-pointer text-light-dark text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      name="messageRole"
      value={role == "contact" ? roleContactValue : roleMessageValue}
      onChange={(e) => updateUserById(e, val?._id, role)}
      disabled={val.inviteStatus === "suspended" && true}
    >
      {roles &&
        roles.length > 0 &&
        roles.map((subItem, index) => {
          return (
            <>
              <option value={subItem?._id}>{subItem?.role}</option>
            </>
          );
        })}
    </select>
  );
}
