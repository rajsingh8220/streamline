import React from "react";
import Modal from "react-responsive-modal";

const LeaveModal = ({ open, handleDeleteRole, onCloseModal, loader }) => {
  return (
    <div className="block">
      <Modal
        open={open}
        onClose={onCloseModal}
        className="hello"
        classNames={{
          modal: "small-medium",
        }}
      >
        <div className="py-4 pt-10 px-5">
          <h1 className="text-[22px] text-center mb-3 text-dark tracking-[-.03em] font-bold font-Karla mt-1">
            Leave Confirmation
          </h1>
          <div className="block text-center">
            <span className="text-light-dark text-base font-normal font-Karla">
              Are you sure you want to leave this?
            </span>
          </div>
        </div>
        <div className="flex justify-center mb-2 mt-5">
          {" "}
          <button
            type="button"
            onClick={
              !loader ? handleDeleteRole : (event) => event.preventDefault()
            }
            className="rounded-md h-[56px] font-bold flex items-center tracking-[-.03em] min-w-[135px] justify-center text-lg bg-primary text-white py-2.5 px-3.5 font-Karla"
          >
            {loader ? (
              <>
                <box-icon
                  name="loader-circle"
                  class="fill-white mr-2"
                  animation="spin"
                ></box-icon>{" "}
                Leave
              </>
            ) : (
              "Leave"
            )}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LeaveModal;
