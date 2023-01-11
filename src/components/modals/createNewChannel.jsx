import { useState } from "react";
import Modal from "react-responsive-modal";
import InviteMember from "./InviteMember";
import UserProfile from "./../../assets/images/user.webp";

const CreateNewChannel = ({
  open,
  onCloseModal,
  loader,
  channelData,
  handleChannelChange,
  handleRemoveClick,
  handleSubmit,
  errors,
  selectedMemberList,
  setSelectedMemberList,
  setErrors,
  checked,
  handleCheckedChange,
  setMemberId,
  memberId,
  edit,
  handleChannelEditSubmit,
}) => {
  const [openInviteMember, setOpenInviteMember] = useState(false);

  const handleOpenInviteMember = () => {
    setOpenInviteMember(true);
    setErrors(null);
  };
  const handleCloseInviteMember = () => {
    setOpenInviteMember(false);
    setErrors(null);
  };

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
            {edit == true ? "Edit Channel" : "Create new channel"}
          </h1>
          <form
            className="my-4"
            onSubmit={
              !loader && !edit
                ? handleSubmit
                : !loader && edit == true
                ? handleChannelEditSubmit
                : (event) => event.preventDefault()
            }
          >
            <div className="d-block mb-2 relative">
              <label
                htmlFor="currentName"
                className="text-base font-bold font-Karla text-light-dark mb-1 block"
              >
                Channel Name
              </label>
              <input
                type="text"
                name="channelName"
                className="rounded border border-input-border w-full p-3 px-5 h-[60px] text-lg outline-none font-Karla"
                placeholder="e.g. property-name"
                value={channelData.channelName}
                onChange={handleChannelChange}
              />
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.channelName}
              </span>
            </div>
            <div className="d-block mb-2 relative">
              <textarea
                type="text"
                name="about"
                rows="3"
                className="rounded border border-input-border w-full p-3 px-5 text-lg outline-none font-Karla"
                placeholder="What’s the channel about?"
                value={channelData.about}
                onChange={handleChannelChange}
              ></textarea>
              <span className="form-error text-error text-sm font-normal">
                {errors && errors.about}
              </span>
            </div>
            <div className="d-block mb-4 relative">
              <label
                htmlFor="inviteNumber"
                className="text-base font-bold font-Karla text-text-dark tracking-[-.03em] mb-1 block"
              >
                Members
              </label>
              <button
                type="button"
                onClick={handleOpenInviteMember}
                className="rounded-md text-lg bg-white font-bold border-primary text-primary text-left border-2 py-4 px-6 font-Karla w-full"
              >
                + Invite a member
              </button>
              <ul className="block mt-2">
                {selectedMemberList &&
                  selectedMemberList.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="rounded-md mb-2 flex justify-between items-center text-lg bg-white font-bold border-primary text-primary text-left border-2 py-4 px-6 font-Karla w-full"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={UserProfile}
                            alt="user pic"
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-lg font-bold font-Karla text-light-dark">
                            {item.name}
                          </span>
                        </div>
                        <span
                          onClick={() => handleRemoveClick(item)}
                          className="text-base cursor-pointer font-bold font-Karla text-primary"
                        >
                          Remove
                        </span>
                      </li>
                    );
                  })}
              </ul>
            </div>
            <span className="form-error text-error text-sm font-normal">
              {errors && errors.selectedMemberList}
            </span>
            <div className="d-block mb-2 relative">
              <label
                htmlFor="makePrivate"
                className="text-base font-bold font-Karla text-text-dark tracking-[-.03em] mb-1 block"
              >
                Make private
              </label>
              <p className="text-light-dark text-sm font-Karla">
                When a channel is set to private, it can only be viewed or
                joined by invitation.
              </p>
              <div>
                <label
                  htmlFor="default-toggle1"
                  className="inline-flex relative mt-2 items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name="checked"
                    id="default-toggle1"
                    className="sr-only peer"
                    checked={checked}
                    onClick={handleCheckedChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#5EE092]"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-start mb-2 mt-8">
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
                    {edit == true ? "Edit channel" : "Create channel"}
                  </>
                ) : (
                  <>{edit == true ? "Edit channel" : "Create channel"}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <InviteMember
        openInviteMember={openInviteMember}
        handleCloseInviteMember={handleCloseInviteMember}
        loader={loader}
        setSelectedMemberList={setSelectedMemberList}
        selectedMemberList={selectedMemberList}
        errors={errors}
        setErrors={setErrors}
        setMemberId={setMemberId}
        memberId={memberId}
      />
    </div>
  );
};

export default CreateNewChannel;
