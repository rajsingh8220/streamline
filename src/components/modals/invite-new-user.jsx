import React from "react";
import { useState } from "react";
import Modal from "react-responsive-modal";

const InviteNewUser = ({
  open,
  setOpen,
  handleInviteChange,
  contactRoles,
  messageRoles,
  loader,
  handleInviteSubmit,
  onCloseModal,
  inviteData,
  errors,
}) => {

  return (
    <div className="block">
      <Modal open={open} onClose={onCloseModal} center>
        <div className="">
          <h1 className="text-base text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
            Invite New User
          </h1>
          <div className="block">
            <h5 className="mb-2 text-dark text-base tracking-[-.03em] font-Karla font-medium">
              Who is joining the team?
            </h5>
            <p className="text-dark text-[13px] tracking-[-.03em] font-Karla font-medium">
              TIP: you can add multiple users by entering email addresses
              separated by comma ( , ){" "}
            </p>
          </div>
          <form
            className="my-4"
            onSubmit={
              !loader ? handleInviteSubmit : (event) => event.preventDefault()
            }
          >
            <label className="text-base font-bold font-Karla text-light-dark tracking-[-.03em] mb-1 block">
              Email Address
            </label>
            <div className="d-block mb-2 relative">
              <input
                type="email"
                name="email"
                multiple
                className="h-[60px] rounded border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                placeholder="jane@starplus.com,peter@starplus.com,mike@starplus.com"
                value={inviteData.email}
                onChange={handleInviteChange}
              ></input>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.email}
              </span>
            </div>
            <div className="block">
              <h5 className="text-dark text-base tracking-[-.03em] font-Karla font-medium mb-5">
                Which modules and roles should be assigned?
              </h5>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.module}
              </span>
              <div className="flex columns-2 justify-between items-center mb-3">
                <div className="flex w-[50%] justify-start items-center">
                  <input
                    type="checkbox"
                    name="contact"
                    checked={inviteData.contact}
                    onClick={handleInviteChange}
                  />
                  <label className="ml-4 text-light-dark text-base tracking-[-.03em] font-Karla font-normal">
                    Contacts
                  </label>
                </div>
                <div className="flex w-[50%] justify-end items-center">
                  <h6 className="text-dark text-[11px] tracking-[-.03em] font-Karla font-bold mr-2">
                    ROLE
                  </h6>
                  <select
                    id="inviteRole"
                    className="w-[150px] h-[30px] border border-input-border p-1 px-2 cursor-pointer text-light-dark text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="contactRole"
                    disabled={!inviteData.contact}
                    value={inviteData.contactRole}
                    onChange={handleInviteChange}
                  >
                    <option value="">Select Role</option>

                    {contactRoles.length > 0 &&
                      contactRoles.map((subItem, index) => {
                        return (
                          <>
                            <option value={subItem._id}>{subItem.role}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.contact}
              </span>

              <div className="flex columns-2 justify-between items-center mb-3">
                <div className="flex w-[50%] justify-start items-center">
                  <input
                    type="checkbox"
                    name="message"
                    checked={inviteData.message}
                    onClick={handleInviteChange}
                  />
                  <label className="ml-4 text-light-dark text-base tracking-[-.03em] font-Karla font-normal">
                    Messaging
                  </label>
                </div>
                <div className="flex w-[50%] justify-end items-center">
                  <h6 className="text-dark text-[11px] tracking-[-.03em] font-Karla font-bold mr-2">
                    ROLE
                  </h6>
                  <select
                    id="inviteRole"
                    className="w-[150px] h-[30px] border border-input-border p-1 px-2 cursor-pointer text-light-dark text-xs rounded-md focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="messageRole"
                    disabled={!inviteData.message}
                    value={inviteData.messageRole}
                    onChange={handleInviteChange}
                  >
                    <option value={""}>Select Role</option>

                    {messageRoles.length > 0 &&
                      messageRoles.map((subItem, index) => {
                        return (
                          <>
                            <option value={subItem._id}>{subItem.role}</option>
                          </>
                        );
                      })}
                  </select>
                </div>
              </div>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.message}
              </span>
            </div>
            <div className="flex justify-start mb-2 mt-8">
              <button
                type="submit"
                className="rounded-md h-[39px] font-bold flex items-center tracking-[-.03em] min-w-[100px] justify-center text-lg bg-primary text-white py-2.5 px-3.5 font-Karla"
              >
                {loader ? (
                  <>
                    <box-icon
                      name="loader-circle"
                      class="fill-white mr-2"
                      animation="spin"
                    ></box-icon>{" "}
                    Send invite
                  </>
                ) : (
                  "Send invite"
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default InviteNewUser;
