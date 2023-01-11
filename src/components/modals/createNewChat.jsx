import { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import InviteMembersList from "../../pages/message/inviteMembersList";

const CreateNewChat = ({
  open,
  onCloseModal,
  loader,
  invitedMembers,
  setInvitedMembers,
  handleDChatList,
  setSearchValue,
  searchValue,
  getInviteMembers,
}) => {
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const applyFilter = () => {
    let filtered = [];
    filtered =
      invitedMembers &&
      invitedMembers.filter(
        (val) =>
          val?.email.toLowerCase().includes(searchValue.toLowerCase()) ||
          val?.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    setInvitedMembers(filtered);
  };

  useEffect(() => {
    if (searchValue) applyFilter();
    else getInviteMembers();
  }, [searchValue]);

  return (
    <div className="block">
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{
          modal: "modal-medium",
          overlay: "modal-full-height",
        }}
      >
        <div className="py-4 px-5">
          <span className="text-xs text-primary font-bold font-Karla tracking-[-.03em]">
            MESSAGING
          </span>
          <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla">
            Create new Chat
          </h1>
          <form className="mt-4 mb-2">
            <div className="d-block relative">
              <label
                htmlFor="userName"
                className="text-base font-bold font-Karla text-light-dark mb-1 block"
              >
                User Name
              </label>
              <input
                type="text"
                name="searchValue"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="user-name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </form>
          <div className="block">
            <h5 className="text-sm font-Karla text-light-grey">Sugguested</h5>
            <ul className="py-2 max-h-80 h-80 overflow-x-auto">
              {invitedMembers &&
                invitedMembers.map((val) => {
                  return (
                    <InviteMembersList
                      val={val}
                      handleDChatList={handleDChatList}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateNewChat;
