import React from "react";
import Modal from "react-responsive-modal";

const ResetUserPassword = ({
  errors,
  open,
  setOpen,
  resetPass,
  handleResetChange,
  handleSubmitReset,
  onCloseModal,
  loader,
}) => {
  return (
    <div className="block">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="py-4 px-5">
          <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
            Change Password
          </h1>
          <form
            className="my-4"
            onSubmit={
              !loader
                ? handleSubmitReset
                : (event) => {
                    event.preventDefault();
                  }
            }
          >
            <div className="d-block mb-2 relative">
              <input
                type="password"
                name="currentPassword"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="Current Password"
                value={resetPass.currentPassword}
                onChange={handleResetChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.currentPassword}
              </span>
            </div>
            <div className="d-block mb-2 relative">
              <input
                type="password"
                name="newPassword"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="New Password"
                value={resetPass.newPassword}
                onChange={handleResetChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.newPassword}
              </span>
            </div>
            <div className="d-block mb-2 relative">
              <input
                type="password"
                name="confirmPassword"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="Confirm New Password"
                value={resetPass.confirmPassword}
                onChange={handleResetChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.confirmPassword}
              </span>
            </div>
            <div className="flex justify-end mb-2 mt-8">
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
                    Update
                  </>
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ResetUserPassword;
