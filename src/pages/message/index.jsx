import React, { useState } from "react";
import SettingBlueIcon from "./../../assets/icons/setting-blue-icon.svg";
import CloseIcon from "./../../assets/icons/close-icon.svg";
import FileBlueIcon from "./../../assets/icons/file-blue-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import ChatDirectMessage from "../../components/message/directMessage";
import ChatChannels from "../../components/message/channels";
import CreateNewChannel from "../../components/modals/createNewChannel";
import GlobalChat from "../../components/message/chat";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  createChannelApi,
  deleteChannelApi,
  editChannelApi,
  getChannelApi,
} from "../../Api/channel";
import toast from "toastr";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/user";
import { useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import app from "../../helpers/firebase";
import { useRef } from "react";
import DeleteModal from "../../components/modals/deleteConfirmation";
import LeaveModal from "../../components/modals/leaveConfirmation";
import CreateNewChat from "../../components/modals/createNewChat";
import { getFilterInviteMemberApi } from "../../Api/user";

const MessagePage = () => {
  const db = getDatabase(app);
  const userData = useSelector((state) => state.user.user);

  toast.options = { preventDuplicates: true };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [openNewChatModal, setOpenNewChatModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [errors, setErrors] = useState(null);
  const [selectedMemberList, setSelectedMemberList] = useState([]);
  const [membersId, setMemberId] = useState([userData._id]);
  const [channels, setChannels] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [channelData, setChannelData] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("single");

  const [channelValue, setChannelValue] = useState({});
  const [chatValue, setChatValue] = useState({});
  const [chatId, setChatId] = useState("");

  const [channelMembers, setChannelMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchState, setSearchState] = useState("");

  const [showGlobalSearch, setShowGlobalSearch] = useState(false);

  const onCloseDeleteModal = () => {
    setOpenDelete(false);
    setLoader(false);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };
  const onCloseLeaveModal = () => {
    setOpenLeave(false);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
    setLoader(false);
  };

  const handleAddNewChat = () => {
    setOpenNewChatModal(true);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };
  const handleCloseNewChat = () => {
    setOpenNewChatModal(false);
    setSearchValue("");
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const handleOpenSearch = () => {
    setShowGlobalSearch(!showGlobalSearch);
    if (showGlobalSearch) {
      setSearchState("");
      setSearchValue("");
    }
  };

  const bottomRef = useRef();
  const handleAddNewChannel = () => {
    setOpen(true);
    setErrors(null);
    setSelectedMemberList([]);
    setChecked(false);
    setChannelData({});
    setEdit(false);
    setMemberId([userData._id]);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };
  const onCloseModal = () => {
    setErrors(null);
    setSelectedMemberList([]);
    setChecked(false);
    setChannelData({});
    setOpen(false);
    setMemberId([userData._id]);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const handleChannelChange = (e) => {
    setChannelData({ ...channelData, [e.target.name]: e.target.value });
    setErrors(null);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const isValid = () => {
    let formData = true;
    switch (true) {
      case !channelData.channelName:
        setErrors({ channelName: "Channel Name is required!" });
        formData = false;
        break;
      case !channelData.about:
        setErrors({ about: "Channel Description is required!" });
        formData = false;
        break;
      case selectedMemberList.length == 0:
        setErrors({ selectedMemberList: "Please invite at least one member!" });
        formData = false;
        break;

      default:
        formData = true;
    }
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: channelData?.channelName,
      description: channelData?.about ? channelData?.about : "",
      isPrivate: checked,
      members: membersId,
      type: "channel",
    };
    if (isValid()) {
      setLoader(true);
      const res = await createChannelApi(obj);
      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        getChannels();
        setLoader(false);
        setErrors(null);
        setOpen(false);
        setChannelData({});
        setSelectedMemberList([]);
        setMemberId([userData._id]);
        setChecked(false);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    }
  };

  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
  };

  useEffect(() => {
    getChannels();
  }, []);

  const getChannels = async () => {
    setLoader(true);
    const res = await getChannelApi();
    if (res?.data?.code === 200) {
      setChannels(res.data.data?.channels);
      setChatList(res.data.data?.chats);

      if (edit == true) {
      } else {
        if (res.data.data?.chats.length > 0) {
          setChannelValue(res.data.data?.chats[0]?.receiver);
          setChatValue(res.data.data?.chats[0]);
          setType("single");
          setChatId(res.data.data?.chats[0]?._id);
        } else {
          setType("channel");
          setChannelValue(res.data.data?.channels[0]);
          setChatId(res.data.data?.channels[0]?._id);
          setChannelMembers(res.data.data?.channels[0]?.members);
        }
      }
      setLoader(false);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  const addMessage = () => {
    const date = new Date().getTime();
    var d1 = new Date().toISOString();
    set(ref(db, "channel/" + chatId + "/" + date), {
      messageid: date,
      chatid: chatId,
      dateTime: d1,
      message: message,
      sender: userData._id,
      userId: userData._id,
      // mediaType: data.mediaType ? data.mediaType : "",
      // urlLink: data?.urlLink ? data?.urlLink : null,
    });
    readMessage();
  };

  useEffect(() => {
    if (chatId) readMessage();
  }, [chatId]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setErrors(null);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const isMessageValid = () => {
    let formData = true;
    switch (true) {
      case !message.trim():
        setErrors({ message: "Please add some text here!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const readMessage = () => {
    const starCountRef = ref(db, "channel/" + chatId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const convertedData = Object.keys(data).map((d) => {
          return data[d];
        });
        setMessages(convertedData);
      } else {
        setMessages([]);
      }
    });
  };

  const handleChatClick = (val, index) => {
    setChannelValue(val);
    setChannelMembers(val?.members);
    setMemberId([userData._id]);
    setType("channel");
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
    setChatId(val._id);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(membersId, "membersId");
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (isMessageValid()) {
      await addMessage();
      setMessage("");
      setErrors({});
      setShowGlobalSearch(false);
      setSearchValue(null);
      setSearchState(null);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChannelEdit = () => {
    setOpen(true);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
    setEdit(true);
    setChannelData({
      channelName: channelValue.name,
      about: channelValue.description,
    });
    setChecked(channelValue.isPrivate);
    const data = channelValue?.members.filter(
      (val) => val._id !== userData._id
    );
    const data1 = data.map((item) => {
      const obj = {
        name: item.email,
        id: item._id,
      };
      return obj;
    });
    const data2 = data.map((item) => {
      return item._id;
    });
    const data3 = membersId.concat(data2);
    setMemberId(data3);
    setSelectedMemberList(data1);
  };
  const handleOpenDelete = () => {
    setOpenDelete(true);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const handleOpenLeave = () => {
    setOpenLeave(true);
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
  };

  const handleChannelEditSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name: channelData?.channelName,
      description: channelData?.about ? channelData?.about : "",
      isPrivate: checked,
      members: membersId,
    };
    if (isValid()) {
      setLoader(true);
      const res = await editChannelApi(channelValue._id, obj);
      if (res?.data?.code === 200) {
        toast.success(res.data.message);
        getChannels();
        setLoader(false);
        setErrors(null);
        setOpen(false);
        setChannelData({});
        setSelectedMemberList([]);
        setMemberId([userData._id]);
        setChecked(false);
      } else if (res?.data?.code === 401) {
        toast.error("Session has been expired!");
        localStorage.clear();
        dispatch(login({}));
        navigate("/login");
      } else {
        toast.error(res.data.message);
        setLoader(false);
      }
    }
  };

  const handleRemoveClick = (val) => {
    if (selectedMemberList.find((item) => item.id == val.id)) {
      const d = selectedMemberList.filter((item) => item.id !== val.id);
      setSelectedMemberList(d);
    }
    if (membersId.includes(val.id)) {
      const d1 = membersId.filter((item) => item !== val.id);
      setMemberId(d1);
    }
  };

  const handleDeleteChannel = async () => {
    setLoader(true);
    const res = await deleteChannelApi(chatId);
    if (res?.data?.code === 200) {
      toast.success(
        type == "single" ? "Chat Deleted Successfully" : res.data.message
      );
      getChannels();
      setLoader(false);
      setOpenDelete(false);
      setShowGlobalSearch(false);
      setSearchValue(null);
      setSearchState(null);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  const handleLeave = async () => {
    setLoader(true);
    var item = channelValue.members.filter((val) => val._id !== userData._id);

    const data = item.map((val) => val._id);

    const obj = {
      name: channelData?.channelName,
      description: channelData?.about ? channelData?.about : "",
      isPrivate: checked,
      members: data,
    };
    const res = await editChannelApi(channelValue._id, obj);
    if (res?.data?.code === 200) {
      toast.success("Channel left successfully");
      getChannels();
      setLoader(false);
      setOpenLeave(false);
      setShowGlobalSearch(false);
      setSearchValue(null);
      setSearchState(null);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));

      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  useEffect(() => {
    getInviteMembers();
  }, []);

  const getInviteMembers = async () => {
    const res = await getFilterInviteMemberApi("", "active", "", "message");
    if (res?.data?.code === 200) {
      setInvitedMembers(res.data.data);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  const handleDChatList = async (val) => {
    const obj = {
      type: "single",
      sender: userData._id,
      receiver: val._id,
    };
    const res = await createChannelApi(obj);
    if (res?.data?.code === 200) {
      toast.success(res.data.message);
      getChannels();
      setOpenNewChatModal(false);
      setShowGlobalSearch(false);
      setSearchValue(null);
      setSearchState(null);
    } else if (res?.data?.code === 401) {
      toast.error("Session has been expired!");
      localStorage.clear();
      dispatch(login({}));
      navigate("/login");
    } else {
      toast.error(res.data.message);
      setLoader(false);
    }
  };

  const onChatClick = (val, index) => {
    setChannelValue(val?.receiver);
    setChatValue(val);
    setType("single");
    setShowGlobalSearch(false);
    setSearchValue(null);
    setSearchState(null);
    setChatId(val._id);
  };

  const applyFilter = () => {
    let filtered = [];
    let filtered1 = [];

    filtered =
      chatList &&
      chatList.filter(
        (val) =>
          val?.receiver?.email
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          val?.receiver?.email.toLowerCase().includes(searchValue.toLowerCase())
      );
    filtered1 =
      channels &&
      channels.filter(
        (val) =>
          val.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          val.name.toLowerCase().includes(searchValue.toLowerCase())
      );

    setChannels(filtered1);
    setChatList(filtered);
  };

  const applyMessageFilter = () => {
    let filtered2 = [];
    filtered2 =
      messages &&
      messages.filter(
        (val) =>
          val.message.toLowerCase().includes(searchState.toLowerCase()) ||
          val.message.toLowerCase().includes(searchState.toLowerCase())
      );
    setMessages(filtered2);
  };

  useEffect(() => {
    if (searchState) applyMessageFilter();
    else getChannels();
  }, [searchState]);

  useEffect(() => {
    if (searchValue) applyFilter();
    else getChannels();
  }, [searchValue]);

  return (
    <div className="block">
      <div className="flex items-center justify-between columns-2 flex-wrap mb-8">
        <div className="block">
          <h1 className="font-Karla font-bold text-xl mb-0 text-text-dark tracking-[-0.03em]">
            Messaging
          </h1>
        </div>
        <div className="flex bg-primary/10 py-3 px-7 rounded-md">
          <Link
            to="/message-settings"
            type="button"
            className="flex items-center mr-6 text-primary"
          >
            <img
              src={SettingBlueIcon}
              alt="setting icon"
              className="w-5 mr-3"
            />
            Settings, users & roles
          </Link>
          <button type="button" className="flex items-center text-primary mr-3">
            <img src={FileBlueIcon} alt="file icon" className="w-5 mr-3" />
            Reporting
          </button>
        </div>
      </div>
      <div className="flex columns-2 flex-wrap justify-between">
        <div className="block w-[35%]">
          <div className="block">
            <form>
              <div className="block relative mb-5">
                <div className="block relative">
                  <box-icon
                    name="search-alt"
                    class="absolute w-4 fill-[#495057] top-2 left-3"
                  ></box-icon>
                </div>
                <input
                  type="text"
                  name="searchValue"
                  className="bg-white rounded-[50px] text-[13px] tracking-[-.03em] pl-9 border-0 w-full p-3 px-5 h-[40px] text-lg outline-none font-Karla"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <fieldset className="custom-scroller block max-h-[calc(100vh-255px)] overflow-auto">
                <div className="flex flex-wrap relative justify-start overflow-hidden bg-slate-900 text-dark2">
                  <label
                    htmlFor="collapse"
                    className="grow w-full px-4 py-3 pr-10 pl-0 font-medium text-sm cursor-pointer flex justify-between"
                  >
                    Direct Messages
                    <button
                      type="button"
                      onClick={handleAddNewChat}
                      className="bg-primary text-white relative z-50 py-0.5 px-1.5 rounded-md h-5 text-xs"
                    >
                      + Create new
                    </button>
                  </label>
                  <input
                    className="peer absolute cursor-pointer z-40 m-0 h-[40px] w-full appearance-none rounded border text-slate-800 accent-slate-600 opacity-0"
                    type="checkbox"
                    name="collapse"
                    id="collapse"
                    checked
                  />
                  <box-icon
                    name="chevron-down"
                    class="fill-dark2 peer-checked:rotate-180 absolute top-2.5 right-1.5"
                  ></box-icon>
                  <div className="-transparent absolute -translate-y-full w-full scale-75 opacity-0 transition-all duration-200 peer-checked:relative peer-checked:translate-y-0 peer-checked:scale-100 peer-checked:scale-y-100 peer-checked:bg-slate-800 peer-checked:opacity-100">
                    {chatList &&
                      chatList.map((item, index) => {
                        return (
                          <ChatDirectMessage
                            item={item}
                            index={index}
                            onChatClick={onChatClick}
                            channelValue={channelValue}
                            type={type}
                            chatId={chatId}
                          />
                        );
                      })}
                  </div>
                </div>
                <div className="flex flex-wrap relative justify-start overflow-hidden bg-slate-900 text-dark2">
                  <label
                    htmlFor="collapse2"
                    className="grow px-4 py-3 pl-0 font-medium text-sm cursor-pointer flex justify-between pr-10"
                  >
                    Channels{" "}
                    <button
                      type="button"
                      onClick={handleAddNewChannel}
                      className="bg-primary text-white relative z-50 py-0.5 px-1.5 rounded-md h-5 text-xs"
                    >
                      + Create new
                    </button>
                  </label>
                  <input
                    className="peer absolute cursor-pointer z-40 m-0 h-[40px] w-full appearance-none rounded border text-slate-800 accent-slate-600 opacity-0"
                    type="checkbox"
                    name="collapse2"
                    id="collapse2"
                  />
                  <box-icon
                    name="chevron-down"
                    class="fill-dark2 peer-checked:rotate-180 absolute top-2.5 right-1.5"
                  ></box-icon>
                  {channels && channels.length > 0 && (
                    <div className="-transparent absolute -translate-y-full w-full scale-75 opacity-0 transition-all duration-200 peer-checked:relative peer-checked:translate-y-0 peer-checked:scale-100 peer-checked:scale-y-100 peer-checked:bg-slate-800 peer-checked:opacity-100">
                      {channels &&
                        channels.map((val, index) => {
                          return (
                            <ChatChannels
                              val={val}
                              index={index}
                              handleChatClick={handleChatClick}
                              type={type}
                              channelValue={channelValue}
                              chatId={chatId}
                            />
                          );
                        })}
                    </div>
                  )}
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div className="block w-[63%] max-h-[calc(100vh-195px)] min-h-[calc(100vh-195px)] bg-white">
          <div className="flex columns-2 items-center justify-between px-7 py-5">
            {chatList.length || channels.length > 0 ? (
              <div className="block">
                <h4 className="text-lg">
                  {type == "single"
                    ? channelValue && channelValue.email
                    : channelValue?.name}{" "}
                  &nbsp;{" "}
                  <button
                    type="button"
                    className="bg-primary text-white py-0.5 px-1.5 rounded-md h-5 text-xs"
                  >
                    View Deal
                  </button>
                </h4>
              </div>
            ) : (
              ""
            )}
            {chatList.length || channels.length > 0 ? (
              <div className="flex">
                <div className="relative mr-2">
                  <button
                    onClick={handleOpenSearch}
                    className="w-10 absolute right-0 h-10 rounded-full flex items-center justify-center bg-slate-grey"
                  >
                    {showGlobalSearch ? (
                      <img src={CloseIcon} alt="close icon" />
                    ) : (
                      <box-icon name="search" class="w-4 fill-dark2"></box-icon>
                    )}
                  </button>
                  {showGlobalSearch && (
                    <input
                      type="text"
                      name="searchState"
                      className="border border-light-border max-w-[220px] rounded-full text-sm pl-5 pr-12 h-[40px]"
                      placeholder="Type here ...."
                      value={searchState}
                      onChange={(e) => setSearchState(e.target.value)}
                    />
                  )}
                </div>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex">
                      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-grey">
                        {" "}
                        <box-icon
                          name="dots-horizontal-rounded"
                          class="w-5 fill-dark2"
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
                    <Menu.Items className="absolute right-0 z-10 top-12 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="w-24 bg-white rounded-md z-40 drop-shadow-md right-0 top-12">
                        {channelValue?.ownerId == userData?._id &&
                        type == "channel" ? (
                          <div className="block py-2">
                            <Menu.Item className="w-full flex justify-start pt-1 px-3">
                              <button
                                type="button"
                                onClick={handleChannelEdit}
                                className={({ isActive }) =>
                                  isActive
                                    ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                    : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                }
                              >
                                Edit
                              </button>
                            </Menu.Item>
                            <Menu.Item className="w-full flex justify-start py-1 px-3">
                              <button
                                type="button"
                                onClick={handleOpenDelete}
                                className={({ isActive }) =>
                                  isActive
                                    ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                    : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                }
                              >
                                Delete
                              </button>
                            </Menu.Item>
                          </div>
                        ) : type == "single" ? (
                          <Menu.Item className="w-full flex justify-start py-1 px-3">
                            <button
                              type="button"
                              onClick={handleOpenDelete}
                              className={({ isActive }) =>
                                isActive
                                  ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                  : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                              }
                            >
                              Delete
                            </button>
                          </Menu.Item>
                        ) : (
                          <div className="block py-2">
                            <Menu.Item className="w-full flex justify-start pt-1 px-3">
                              <button
                                type="button"
                                onClick={handleOpenLeave}
                                className={({ isActive }) =>
                                  isActive
                                    ? "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                    : "text-base w-full font-Karla font-medium pl-5 flex items-center border-t border-light-border h-12 text-light-gray hover:text-primary"
                                }
                              >
                                Leave
                              </button>
                            </Menu.Item>
                          </div>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="custom-scroller block min-h-[calc(100vh-345px)] max-h-[calc(100vh-345px)] overflow-auto">
            {messages &&
              messages.map((val) => {
                return (
                  <GlobalChat
                    val={val}
                    bottomRef={bottomRef}
                    channelMembers={channelMembers}
                    channelValue={channelValue}
                    type={type}
                    chatValue={chatValue}
                  />
                );
              })}
          </div>
          {chatList.length || channels.length > 0 ? (
            <form onSubmit={handleChatSubmit}>
              <div className="flex columns-2 relative border-t border-slate-grey justify-between items-center py-4 pl-6 pr-4">
                <div className="block w-[80%]">
                  <input
                    type="text"
                    name="message"
                    className="bg-slate-grey rounded-full border-0 w-full p-3 px-5 h-[38px] text-sm outline-none font-Karla"
                    placeholder="Enter Message..."
                    value={message}
                    onChange={handleMessageChange}
                  />
                  <span className="form-error text-error text-xs absolute bottom-0.5 left-6 font-normal">
                    {errors && errors.message}
                  </span>
                </div>
                <div className="flex justify-end w-[20%]">
                  <button
                    type="submit"
                    className="bg-primary text-white rounded-full w-28 h-9 font-Karla"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          ) : (
            " "
          )}
        </div>
      </div>
      <CreateNewChannel
        onCloseModal={onCloseModal}
        open={open}
        setOpen={setOpen}
        channelData={channelData}
        setLoader={setLoader}
        handleChannelChange={handleChannelChange}
        handleSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        loader={loader}
        selectedMemberList={selectedMemberList}
        setSelectedMemberList={setSelectedMemberList}
        handleCheckedChange={handleCheckedChange}
        checked={checked}
        setMemberId={setMemberId}
        memberId={membersId}
        edit={edit}
        handleChannelEditSubmit={handleChannelEditSubmit}
        handleRemoveClick={handleRemoveClick}
      />
      <DeleteModal
        open={openDelete}
        onCloseModal={onCloseDeleteModal}
        handleDeleteRole={handleDeleteChannel}
        loader={loader}
      />
      <LeaveModal
        open={openLeave}
        onCloseModal={onCloseLeaveModal}
        handleDeleteRole={handleLeave}
        loader={loader}
      />
      <CreateNewChat
        open={openNewChatModal}
        onCloseModal={handleCloseNewChat}
        loader={loader}
        invitedMembers={invitedMembers}
        setInvitedMembers={setInvitedMembers}
        handleDChatList={handleDChatList}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        getInviteMembers={getInviteMembers}
      />
    </div>
  );
};

export default MessagePage;
