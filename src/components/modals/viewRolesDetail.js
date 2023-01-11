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

const ViewRoleDetails = ({
  openViewRole,
  onCloseRoleModal,
  rolesData,
  rolesPermissions,
  rolesChannels,
  searchState,
  setSearchState,
}) => {
  const applyFilter = () => {
    let filtered = [];
    filtered = arr && arr.filter((val) => rolesPermissions.includes(val.value));
    filtered =
      filtered &&
      filtered.filter(
        (val) =>
          val.name.toLowerCase().includes(searchState.toLowerCase()) ||
          val.name.toLowerCase().includes(searchState.toLowerCase())
      );

    const FilteredValue = filtered.map((item) => {
      return (
        <li className="block cursor-pointer mb-2">
          <div className="flex w-[50%] justify-start items-center">
            <label
              htmlFor="manageModuleSetting"
              className="text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
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
    filtered = arr1 && arr1.filter((val) => rolesChannels.includes(val.value));
    filtered =
      filtered &&
      filtered.filter(
        (val) =>
          val.name.toLowerCase().includes(searchState.toLowerCase()) ||
          val.name.toLowerCase().includes(searchState.toLowerCase())
      );

    const FilteredValue = filtered.map((item) => {
      return (
        <li className="block cursor-pointer mb-2">
          <div className="flex w-[50%] justify-start items-center">
            <label
              htmlFor="viewAll"
              className="text-light-dark cursor-pointer text-base tracking-[-.03em] font-Karla font-normal"
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
        open={openViewRole}
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
            Role Details
          </h1>
          <form className="my-4">
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
                disabled={true}
              />

              <div className="h-3 block"></div>
              <textarea
                type="text"
                name="description"
                rows="3"
                className="rounded border border-input-border w-full p-3 px-5 text-lg outline-none font-Karla"
                placeholder="Brief description for this role"
                value={rolesData.description}
                disabled={true}
              ></textarea>
            </div>

            <div className="block">
              <h4 className="text-dark text-lg tracking-[-.03em] font-Karla font-medium mb-5">
                Permissions for this role
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
                  <h5 className="text-light-grey text-lg tracking-[-.03em] font-Karla font-bold mb-3">
                    {rolesPermissions &&
                      rolesPermissions.length > 0 &&
                      "Management"}
                  </h5>
                  <ul className="block">{applyFilter()}</ul>

                  <h5 className="text-light-grey mt-5 text-lg tracking-[-.03em] font-Karla font-bold mb-3">
                    {rolesChannels && rolesChannels.length > 0 && "Channels"}
                  </h5>
                  <ul className="block">{applyFilter1()}</ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ViewRoleDetails;
