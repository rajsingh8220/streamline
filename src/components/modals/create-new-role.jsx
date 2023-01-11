import React from "react";
import Modal from "react-responsive-modal";

const arr = [
  { name: "Manage Module Settings", value: "manage_module_settings" },
  { name: "Manage Users Settings", value: "manage_module_user" },
  { name: "Manage User Roles", value: "manage_user_roles" },
];

const arr1 = [
  { name: "View All Channels", value: "view_all_channels" },
  { name: "View Only Related Channels", value: "view_only_releted_channels" },
  { name: "Delete Channels", value: "delete_channels" },
  {
    name: "Create and Edit Channel Details",
    value: "create_and_edit_channel_details",
  },
];

const CreateNewRole = ({
  openCreateRole,
  loader,
  handleCreateRole,
  onCloseRoleModal,
  rolesData,
  handleRolesChange,
  rolesPermissions,
  handleRolesPChange,
  handleRolesChannelChange,
  errors,
  openEditRole,
  onHandleEditRole,
  rolesChannels,
  duplicate,
  onHandleDuplicate,
  searchState,
  setSearchState,
}) => {
  const applyFilter = () => {
    let filtered = [];
    filtered =
      arr &&
      arr.filter(
        (val) =>
          val.name.toLowerCase().includes(searchState.toLowerCase()) ||
          val.name.toLowerCase().includes(searchState.toLowerCase())
      );

    const FilteredValue = filtered.map((item) => {
      return (
        <li className="block cursor-pointer mb-5">
          <div className="flex w-[50%] justify-start items-center">
            <input
              type="checkbox"
              name="manage_module_settings"
              id="manage_module_settings"
              value={item.value}
              checked={
                rolesPermissions.length > 0 &&
                rolesPermissions.includes(item.value)
              }
              defaultChecked={
                rolesPermissions.length > 0 &&
                rolesPermissions.includes(item.value)
              }
              onClick={handleRolesPChange}
            />
            <label
              htmlFor="manageModuleSetting"
              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
            >
              {item.name}
            </label>
          </div>
        </li>
      );
    });
    return FilteredValue;
  };

  const applyFilter1 = () => {
    let filtered = [];
    filtered =
      arr1 &&
      arr1.filter(
        (val) =>
          val.name.toLowerCase().includes(searchState.toLowerCase()) ||
          val.name.toLowerCase().includes(searchState.toLowerCase())
      );

    const FilteredValue = filtered.map((item) => {
      return (
        <li className="block cursor-pointer mb-5">
          <div className="flex w-[50%] justify-start items-center">
            <input
              type="checkbox"
              name="view_all_channels"
              id="view_all_channels"
              value={item.value}
              checked={
                rolesChannels.length > 0 && rolesChannels.includes(item.value)
              }
              defaultChecked={
                rolesChannels.length > 0 && rolesChannels.includes(item.value)
              }
              onClick={handleRolesChannelChange}
            />
            <label
              htmlFor="viewAll"
              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
            >
              {item.name}
            </label>
          </div>
        </li>
      );
    });
    return FilteredValue;
  };

  return (
    <div className="block">
      <Modal
        open={openCreateRole}
        onClose={onCloseRoleModal}
        center
        classNames={{
          overlay: "modal-full-height",
        }}
      >
        <div className="">
          <span className="text-xs text-primary font-bold font-Karla tracking-[-.03em]">
            Messages
          </span>
          <h1 className="text-base text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
            {openEditRole
              ? "Edit Role"
              : duplicate
              ? "Create Duplicate Role"
              : "Create new role"}{" "}
          </h1>
          <form
            className="my-4"
            onSubmit={
              !loader && duplicate
                ? onHandleDuplicate
                : !loader && openEditRole
                ? onHandleEditRole
                : !loader && !openEditRole
                ? handleCreateRole
                : (event) => event.preventDefault()
            }
          >
            <label
              htmlFor="role"
              className="text-base font-bold font-Karla text-light-dark tracking-[-.03em] mb-1 block"
            >
              Role Name
            </label>

            <div className="d-block mb-2 relative">
              <input
                type="text"
                name="roleName"
                className="rounded border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                placeholder="Enter a name for this role"
                value={rolesData.roleName}
                maxLength={20}
                onChange={handleRolesChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.roleName}
              </span>
              <div className="h-3 block"></div>
              <textarea
                type="text"
                name="description"
                rows="3"
                className="rounded border border-input-border w-full p-3 px-5 text-lg outline-none font-Karla"
                placeholder="Brief description for this role"
                value={rolesData.description}
                onChange={handleRolesChange}
              ></textarea>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.description}
              </span>
            </div>
            {duplicate ? (
              ""
            ) : (
              <>
                <div className="block">
                  <h4 className="text-dark text-lg tracking-[-.03em] font-Karla font-medium mb-5">
                    Select permissions for this role
                  </h4>
                  <div className="block rounded border border-input-border w-full py-4 px-5 mb-3">
                    <div className="block w-[40%] mb-5">
                      <input
                        type="text"
                        name="searchState"
                        className="rounded mb-2 h-[35px] max-w-[196px] border border-input-border w-full p-3 px-5 text-[13px] outline-none font-Karla"
                        placeholder="Search Permission"
                        value={searchState}
                        onChange={(e) => setSearchState(e.target.value)}
                      />
                    </div>
                    <div className="block">
                      <span className="form-error text-error text-sm font-normal">
                        {errors && errors.module_management}
                      </span>
                      <h5 className="text-light-grey text-lg tracking-[-.03em] font-Karla font-bold mb-5">
                        Management
                      </h5>
                      <ul className="block">
                        {applyFilter()}
                        {/* <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="manage_module_settings"
                              id="manage_module_settings"
                              value={"manage_module_settings"}
                              checked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes(
                                  "manage_module_settings"
                                )
                              }
                              defaultChecked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes(
                                  "manage_module_settings"
                                )
                              }
                              onClick={handleRolesPChange}
                            />
                            <label
                              htmlFor="manageModuleSetting"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              Manage Module Settings
                            </label>
                          </div>
                        </li>
                        <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="manage_module_user"
                              id="manage_module_user"
                              value={"manage_module_user"}
                              checked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes("manage_module_user")
                              }
                              defaultChecked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes("manage_module_user")
                              }
                              onClick={handleRolesPChange}
                            />
                            <label
                              htmlFor="manageModuleUser"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              Manage Users Settings
                            </label>
                          </div>
                        </li>

                        <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="manage_user_roles"
                              id="manage_user_roles"
                              value="manage_user_roles"
                              checked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes("manage_user_roles")
                              }
                              defaultChecked={
                                rolesPermissions.length > 0 &&
                                rolesPermissions.includes("manage_user_roles")
                              }
                              onClick={handleRolesPChange}
                            />
                            <label
                              htmlFor="manageUserRole"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              Manage User Roles
                            </label>
                          </div>
                        </li> */}
                      </ul>

                      <h5 className="text-light-grey text-lg tracking-[-.03em] font-Karla font-bold mb-5">
                        Channels
                      </h5>
                      <ul className="block">
                        {applyFilter1()}
                        {/* <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="view_all_channels"
                              id="view_all_channels"
                              value={"view_all_channels"}
                              checked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes("view_all_channels")
                              }
                              defaultChecked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes("view_all_channels")
                              }
                              onClick={handleRolesChannelChange}
                            />
                            <label
                              htmlFor="viewAll"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              View All Channels
                            </label>
                          </div>
                        </li>
                        <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="view_only_releted_channels"
                              id="view_only_releted_channels"
                              value={"view_only_releted_channels"}
                              checked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes(
                                  "view_only_releted_channels"
                                )
                              }
                              defaultChecked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes(
                                  "view_only_releted_channels"
                                )
                              }
                              onClick={handleRolesChannelChange}
                            />
                            <label
                              htmlFor="viewOnly"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              View Only Related Channels
                            </label>
                          </div>
                        </li>
                        <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="delete_channels"
                              id="delete_channels"
                              value={"delete_channels"}
                              checked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes("delete_channels")
                              }
                              defaultChecked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes("delete_channels")
                              }
                              onClick={handleRolesChannelChange}
                            />
                            <label
                              htmlFor="deleteChannels"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              Delete Channels
                            </label>
                          </div>
                        </li>
                        <li className="block cursor-pointer mb-5">
                          <div className="flex w-[50%] justify-start items-center">
                            <input
                              type="checkbox"
                              name="create_and_edit_channel_details"
                              id="create_and_edit_channel_details"
                              value={"create_and_edit_channel_details"}
                              checked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes(
                                  "create_and_edit_channel_details"
                                )
                              }
                              defaultChecked={
                                rolesChannels.length > 0 &&
                                rolesChannels.includes(
                                  "create_and_edit_channel_details"
                                )
                              }
                              onClick={handleRolesChannelChange}
                            />
                            <label
                              htmlFor="createEditChannels"
                              className="ml-4 text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
                            >
                              Create and Edit Channel Details
                            </label>
                          </div>
                        </li> */}
                        {/* <span className="form-error text-error text-sm font-normal">
                          {errors && errors.channels}
                        </span> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {openEditRole ? (
              <div className="flex justify-start mb-2 mt-8">
                <button
                  type="submit"
                  className="rounded-md h-[56px] font-bold flex items-center tracking-[-.03em] min-w-[135px] justify-center text-lg bg-primary text-white py-2.5 px-3.5 font-Karla"
                >
                  {loader ? (
                    <>
                      <box-icon
                        name="loader-circle"
                        class="fill-white mr-2"
                        animation="spin"
                      ></box-icon>{" "}
                      Edit role
                    </>
                  ) : (
                    "Edit role"
                  )}
                </button>
              </div>
            ) : duplicate ? (
              <div className="flex justify-start mb-2 mt-8">
                <button
                  type="submit"
                  className="rounded-md h-[56px] font-bold flex items-center tracking-[-.03em] min-w-[135px] justify-center text-lg bg-primary text-white py-2.5 px-3.5 font-Karla"
                >
                  {loader ? (
                    <>
                      <box-icon
                        name="loader-circle"
                        class="fill-white mr-2"
                        animation="spin"
                      ></box-icon>{" "}
                      Duplicate role
                    </>
                  ) : (
                    "Duplicate role"
                  )}
                </button>
              </div>
            ) : (
              <div className="flex justify-start mb-2 mt-8">
                <button
                  type="submit"
                  className="rounded-md h-[56px] font-bold flex items-center tracking-[-.03em] min-w-[135px] justify-center text-lg bg-primary text-white py-2.5 px-3.5 font-Karla"
                >
                  {loader ? (
                    <>
                      <box-icon
                        name="loader-circle"
                        class="fill-white mr-2"
                        animation="spin"
                      ></box-icon>{" "}
                      Create role
                    </>
                  ) : (
                    "Create role"
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewRole;
