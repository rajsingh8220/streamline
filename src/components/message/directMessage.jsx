import React from "react";
import UserProfile from "./../../assets/images/avtar.png";

const ChatDirectMessage = ({ onChatClick, item, index, type, chatId }) => {
  return (
    <>
      <div
        onClick={(e) => onChatClick(item, index)}
        className={
          type === "single" && chatId === item._id
            ? "block cursor-pointer bg-white"
            : "block cursor-pointer hover:bg-white"
        }
        key={index}
      >
        <div className="flex justify-between items-center h-[68px]">
          <div className="flex items-center">
            <div className="flex px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#74788D]"></span>
            </div>
            <div className="flex items-center space-x-4">
              {/* <div className="block">
                <img
                  src={UserProfile}
                  alt="user profile"
                  className="w-8 h-8"
                />
              </div> */}
              <div className="block">
                <h5 className="font-Karla text-sm mb-0.5 font-bold">
                  {/* {item?.receiver?.firstName
                    ? item?.receiver?.firstName + " " + item?.receiver?.lastName
                    : item?.receiver?.email} */}
                  {item?.receiver?.email}
                </h5>
                <p className="text-sm text-[#74788D]">
                  Last message: {item.lastMessage}
                </p>
              </div>
            </div>
          </div>
          <div className="block pr-4">
            <p className="text-[11px] font-Karla text-[#74788D]">
              {item.lastSeen}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDirectMessage;
