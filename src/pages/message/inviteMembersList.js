import React from "react";
import UserProfile from "./../../assets/images/avtar.png";

export default function InviteMembersList({ val, handleDChatList }) {
  return (
    <li
      onClick={() => handleDChatList(val)}
      className="flex items-center space-x-3 cursor-pointer border-b border-light-border2 pb-3 mb-3"
    >
      <img src={UserProfile} alt="user pro" />
      <span className="text-dark text-base">{val.email}</span>
    </li>
  );
}
