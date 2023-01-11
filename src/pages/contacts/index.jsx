import React from 'react'
import { Link } from 'react-router-dom'
import SettingBlueIcon from './../../assets/icons/setting-blue-icon.svg'
import FileBlueIcon from './../../assets/icons/file-blue-icon.svg'
import CreateNewRecord from '../../components/modals/create-new-record'
import { useState } from 'react'
import EditIcon from "./../../assets/icons/edit-icon.svg";
import CrossIcon from "./../../assets/icons/cross-icon.svg";
import UserProfile from "./../../assets/images/user.webp";
import DeleteModal from '../../components/modals/deleteConfirmation';
import ContactSettingDetails from './contactDetails'


const Contacts = () => {
  const [openNewRecordModal, setOpenNewRecordModal] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [openDeleteContact, setOpenDeleteContact] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false)
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({})
  const [selectedSearchBy, setselectedSearchBy] = useState('Agents')
  const [errors, setErrors] = useState(null);
  const onOpenNewRecordModal = () => {
    setEditContact(false);
    setOpenNewRecordModal(true);
  }
  const onCloseNewRecordModal = () => setOpenNewRecordModal(false);

  const handleChangeSearchBy = (e) => {
    setselectedSearchBy(e.target.value)
  }

  const [selectedTag, setSelectedTag] = useState([]);

  const handleRecordChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value, contactTags: selectedTag });
    setErrors(null);
  }



  const isValid = () => {
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var phoneRegex = /^[0-9,+]{10,}$/;

    let formData = true;
    switch (true) {
      case !data.contactType:
        setErrors({ contactType: "Contact Type is required!" });
        formData = false;
        break;
      case !data.contactStatus:
        setErrors({ contactStatus: "Contact Status  is required!" });
        formData = false;
        break;
      case !data.contactOwner:
        setErrors({ contactOwner: "Contact Owner  is required!" });
        formData = false;
        break;
      case !data.leadSource:
        setErrors({ leadSource: "Lead Source is required!" });
        formData = false;
        break;
      case !data.firstName:
        setErrors({ firstName: "First Name is required!" });
        formData = false;
        break;
      case !data.lastName:
        setErrors({ lastName: "Last Name is required!" });
        formData = false;
        break;
      case !data.contactEmail:
        setErrors({ contactEmail: "Contact Email is required!" });
        formData = false;
        break;
      case data.contactEmail && !emailReg.test(data.contactEmail):
        setErrors({ contactEmail: "Please enter valid email address" });
        formData = false;
        break;
      case !data.contactPhone:
        setErrors({ contactPhone: "Contact Phone is required!" });
        formData = false;
        break;
      case data.contactPhone && !phoneRegex.test(data.contactPhone):
        setErrors({ contactPhone: "Please enter valid phone number" });
        formData = false;
        break;
      case data.contactTags == []:
        setErrors({ contactTags: "Contact Tags is required!" });
        formData = false;
        break;
      default:
        formData = true;
    }
    return formData;
  };

  const handleCreateRecord = (e) => {
    e.preventDefault();
    console.log(data)
    if (isValid()) {
      setLoader(true);
      console.log(data)
    }
    else {
      setLoader(false);
    }
  }

  const handleEditContact = (e) => {
    setOpenNewRecordModal(true);
    setEditContact(true);
  }

  const handleOpenDeleteUser = (e) => {
    setOpenDeleteContact(true);
  }

  const handleDelete = () => {
    setOpenDeleteContact(false);
  }

  const handleOpenContactDetails = () => {
    setShowContactDetails(true);
  }

  const BackToContactSetting = () => setShowContactDetails(false);


  return (
    <div className='block'>
      <div className='flex items-center justify-between columns-2 flex-wrap mb-8'>
        <div className='block'>
          <h1 className="font-Karla font-bold text-xl mb-5 text-text-dark">
            Contacts ›
            {showContactDetails ?
              <>
                <button onClick={BackToContactSetting} className="text-text-dark ml-1">
                  {selectedSearchBy && selectedSearchBy}  › {" "}
                </button>
                <span className="text-primary ml-1">
                  Cody Fisher
                </span>
              </>
              :
              <span className="text-primary ml-1">
                {selectedSearchBy && selectedSearchBy}
              </span>
            }
          </h1>
        </div>
        {
          !showContactDetails ?
            <div className='flex'>
              <div className='flex bg-primary/10 py-1 h-[40px] px-5 rounded-md'>
                <Link
                  to="/contact-settings"
                  type='button'
                  className='flex items-center mr-6 text-primary text-sm font-bold font-Karla'
                >
                  <img src={SettingBlueIcon} alt="setting icon" className='w-5 mr-3' />
                  Settings, users & roles
                </Link>
                <button
                  type='button'
                  className='flex items-center text-primary mr-3 text-sm font-bold font-Karla'
                >
                  <img src={FileBlueIcon} alt="file icon" className='w-5 mr-3' />
                  Reporting
                </button>
              </div>
              <button
                type="button"
                onClick={onOpenNewRecordModal}
                className="rounded-md ml-3 font-bold h-[40px] flex items-center tracking-[-.03em] min-w-[152px] justify-center text-sm bg-primary text-white py-4 px-6 font-Karla"
              >
                + Create new record
              </button>
            </div>
            :
            <button
              type="button"
              className="rounded-md font-bold text-sm bg-danger border-danger text-white text-left border-2 py-2 px-4 font-Karla"
            >
              Delete User
            </button>
        }
      </div>
      {
        showContactDetails ?
          <ContactSettingDetails />
          :
          <div className="block bg-white rounded py-4 px-5">
            <div className="flex items-center justify-between columns-2 mb-4">
              <div className="flex w-[50%]">
                <select
                  id="searchBy"
                  onChange={(e) => handleChangeSearchBy(e)}
                  className="white min-w-[133px] border-none rounded-tr-none focus:shadow-none rounded-br-none outline-0 cursor-pointer font-Karla font-medium text-[13px] leading-4 rounded-md block p-2 px-3 h-[35px] bg-primary text-white"
                >
                  <option defaultValue="Agents">Search Agents</option>
                  <option value="Owner">Select Owner</option>
                  <option value="Tag">Select Tag</option>
                </select>
                <input
                  type="text"
                  name="name"
                  className="rounded border border-input-border2 focus:ring-0 rounded-tl-none rounded-bl-none border-l-0 h-[35px] text-[13px] w-full py-3 px-5 outline-none font-Karla"
                  placeholder="By Agent Name, Contact Owner Name, Tag"
                />
              </div>
              <div className="flex w-[40%] justify-end">
                <select
                  id="filterStatus"
                  className="min-w-[151px] mr-3 border border-input-border2 cursor-pointer text-light-dark text-[13px] leading-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="Invoice">Filter by status</option>
                  <option value="US">Select Option 1</option>
                  <option value="CA">Select Option 2</option>
                  <option value="FR">Select Option 3</option>
                  <option value="DE">Select Option 4</option>
                </select>
                <select
                  id="filterRole"
                  className="min-w-[151px]  border border-input-border2 cursor-pointer text-light-dark text-[13px] leading-4 rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2 px-3 h-[35px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue="Invoice">Filter by location</option>
                  <option value="US">Select Option 1</option>
                  <option value="CA">Select Option 2</option>
                  <option value="FR">Select Option 3</option>
                  <option value="DE">Select Option 4</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-[#F0F2F6] dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-6 pl-3 text-blueDark text-[11px] font-bold"
                    >
                      AGENT NAME
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      CONTACT OWNER
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      STATUS
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      TAGS
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      LOCATION
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-blueDark text-[11px] font-bold"
                    >
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white align-top border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      className="py-4 px-6 pl-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <button onClick={handleOpenContactDetails} className="flex space-x-3">
                        <div className="block w-8">
                          <img
                            src={UserProfile}
                            alt="avtar"
                            className="w-8 h-8 block rounded-full"
                          />
                        </div>
                        <div className="block text-left">
                          <h5>Rahul Singh</h5>
                          <p className="text-[11px] font-Karla text-[#777777]">
                            curtis.weaver@example.com
                          </p>
                        </div>
                      </button>
                    </td>
                    <td
                      className="py-4 px-6 pl-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <button onClick={handleOpenContactDetails} className="flex space-x-3">
                        <div className="block w-8">
                          <img
                            src={UserProfile}
                            alt="avtar"
                            className="w-8 h-8 block rounded-full"
                          />
                        </div>
                        <div className="block text-left">
                          <h5>Rahul Singh</h5>
                          <p className="text-[11px] font-Karla text-[#777777]">
                            curtis.weaver@example.com
                          </p>
                        </div>
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className="text-white bg-[#30E0A1] text-xs cursor-default font-medium mr-2 px-2.5 py-1 rounded capitalize"
                      >Active
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <ul className="flex mb-2">
                        <li>
                          <span
                            className="text-white bg-primary text-xs cursor-default font-medium mr-2 px-2.5 py-1 rounded capitalize"
                          >Hot Lead
                          </span>
                        </li>
                        <li>
                          <span
                            className="text-white bg-primary text-xs cursor-default font-medium mr-2 px-2.5 py-1 rounded capitalize"
                          >Hot Lead
                          </span>
                        </li>
                      </ul>
                    </td>
                    <td className="py-4 px-6">
                      <span className='mb-2 text-light-dark tracking-[-.03em] text-sm'>
                        Riverside, CA
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={handleEditContact}
                        >
                          <img src={EditIcon} alt="edit Icon" className="w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenDeleteUser(e)}
                        >
                          <img
                            src={CrossIcon}
                            alt="cross Icon"
                            className="ml-3 w-5"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <CreateNewRecord
              openNewRecordModal={openNewRecordModal}
              onCloseNewRecordModal={onCloseNewRecordModal}
              loader={loader}
              handleSubmit={handleCreateRecord}
              handleRecordChange={handleRecordChange}
              data={data}
              setSelectedTag={setSelectedTag}
              selectedTag={selectedTag}
              errors={errors}
              editContact={editContact}
            />
            <DeleteModal
              open={openDeleteContact}
              onCloseModal={handleDelete}
            />
          </div>
      }
    </div>
  )
}

export default Contacts