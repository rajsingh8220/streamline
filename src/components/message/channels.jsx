import React from "react";
const channelList = [
  {
    id: "1",
    username: "27 Essex Street Deal",
    lastMessage: "HI Everyone!",
    lastSeen: "05 min",
  },
  {
    id: "2",
    username: "Properties",
    lastMessage: "I know",
    lastSeen: "05 min",
  },
];
const ChatChannels = ({
  val,
  index,
  handleChatClick,
  type,
  chatId,
}) => {
  return (
    <>
      <div
        className={
          type === "channel" && chatId === val._id
            ? "block cursor-pointer bg-white"
            : "block cursor-pointer hover:bg-white"
        }
        key={index}
        onClick={() => handleChatClick(val, index)}
      >
        <div className="flex justify-between items-center h-[68px]">
          <div className="flex items-center">
            <div className="flex items-center space-x-4">
              <div className="block pl-3.5">
                <box-icon
                  type="solid"
                  name="lock-alt"
                  class="w-4 h-5 fill-blueDark"
                ></box-icon>
              </div>
              <div className="block">
                <h5 className="font-Karla text-sm mb-0.5 font-bold">
                  {val.name}
                </h5>
                <p className="text-sm text-[#74788D]">
                  Last message: {val?.lastMessage}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="block pr-4">
            <p className="text-[11px] font-Karla text-[#74788D]">
              {val.lastSeen}
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ChatChannels;
