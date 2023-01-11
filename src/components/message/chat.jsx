import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../helpers/timeFunction";
import { useSelector } from "react-redux";

const GlobalChat = ({
  val,
  bottomRef,
  channelMembers,
  channelValue,
  chatValue,
  type,
}) => {
  const userData = useSelector((state) => state.user.user);
  const filteredData = () => {
    const members =
      channelMembers && channelMembers.filter((item) => item._id == val.sender);

    return members && members.map((item) => item.email);
  };
  return (
    <div className="block px-7">
      <ul className="m-0 p-0">
        {val.sender == userData._id ? (
          <li className="flex justify-end">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex">
                  <button className="ml-2">
                    <box-icon
                      name="dots-vertical-rounded"
                      class="w-5 h-5 fill-[#74788D] mr-2"
                    ></box-icon>
                  </button>
                </Menu.Button>
              </div>
              {/* <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-2 z-10 top-6 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="w-24 bg-white rounded-md z-40 drop-shadow-md right-2 top-6">
                    <div className="block py-2">
                      <Menu.Item className="w-full blockp pt-1 px-3">
                        <Link
                          to=""
                          className={({ isActive }) =>
                            isActive
                              ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                              : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                          }
                        >
                          Edit
                        </Link>
                      </Menu.Item>
                      <Menu.Item className="w-full block py-1 px-3">
                        <Link
                          to=""
                          className={({ isActive }) =>
                            isActive
                              ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                              : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                          }
                        >
                          Delete
                        </Link>
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition> */}
            </Menu>
            <div className="bg-light-bg2 mb-4 inline-block py-2.5 px-7 rounded-lg rounded-br-none">
              <p className="text-primary text-[13px] text-right font-Karla tracking-[-.03em] mb-2.5 font-bold cursor-pointer">
                {type == "single" ? chatValue?.sender?.email : filteredData()}
              </p>
              <p className="text-dark2 text-[13px] font-Karla text-right tracking-[-.03em] mb-4 font-medium">
                {val?.message}
              </p>
              <p className="text-dark2 flex justify-end  text-[13px] font-Karla tracking-[-.03em] mb-2.5 font-medium ">
                <box-icon
                  name="time"
                  class="w-3 text-[#495057] mr-2"
                ></box-icon>{" "}
                {timeAgo(val?.dateTime)}
              </p>
            </div>
          </li>
        ) : (
          <li className="flex justify-start">
            <div className="bg-light-bg2 mb-4 inline-block py-2.5 px-7 rounded-lg rounded-bl-none">
              <p className="text-primary text-[13px] font-Karla tracking-[-.03em] mb-2.5 font-bold cursor-pointer">
                {type == "single" ? chatValue?.receiver?.email : filteredData()}
              </p>
              <p className="text-dark2 text-[13px] font-Karla tracking-[-.03em] mb-4 font-medium">
                {val?.message}
              </p>
              <p className="text-dark2 flex items-center text-[13px] font-Karla tracking-[-.03em] mb-2.5 font-medium ">
                <box-icon
                  name="time"
                  class="w-3 text-[#495057] mr-2"
                ></box-icon>{" "}
                {timeAgo(val?.dateTime)}
              </p>
            </div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex">
                  <button className="ml-2">
                    <box-icon
                      name="dots-vertical-rounded"
                      class="w-5 h-5 fill-[#74788D] mr-2"
                    ></box-icon>
                  </button>
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-2 z-10 top-6 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="w-24 bg-white rounded-md z-40 drop-shadow-md right-2 top-6">
                    <div className="block py-2">
                      <Menu.Item className="w-full blockp pt-1 px-3">
                        <Link
                          to=""
                          className={({ isActive }) =>
                            isActive
                              ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                              : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                          }
                        >
                          Edit
                        </Link>
                      </Menu.Item>
                      <Menu.Item className="w-full block py-1 px-3">
                        <Link
                          to=""
                          className={({ isActive }) =>
                            isActive
                              ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                              : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                          }
                        >
                          Delete
                        </Link>
                      </Menu.Item>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </li>
        )}
      </ul>
      <div ref={bottomRef} />
    </div>
  );
};

export default GlobalChat;
