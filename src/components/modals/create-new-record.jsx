import React from "react";
import Modal from "react-responsive-modal";
import { TagsInput } from "react-tag-input-component";

const CreateNewRecord = ({openNewRecordModal,errors,editContact, onCloseNewRecordModal,loader,data, handleSubmit,handleRecordChange, selectedTag, setSelectedTag}) => {

    return (
        <div className="block">
            <Modal 
                open={openNewRecordModal} 
                onClose={onCloseNewRecordModal} 
                classNames={{
                    overlay: 'modal-full-height',
                }}
                center>
                <div className="block">
                    <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
                      {editContact ? 'Edit Contact' : 'Create New Contact'}  
                    </h1>
                    <form className="my-4" onSubmit={handleSubmit}>
                        <div className="flex columns-2 flex-wrap justify-between">
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="contactType" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    Contact Type
                                </label>
                                <select name="contactType" id="contactType" onChange={handleRecordChange} value={data.contactType} className="w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue="Invoice">Agent</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.contactType}
                                </span>
                            </div>
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="contactStatus" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    Contact Status
                                </label>
                                <select name="contactStatus" id="contactStatus" onChange={handleRecordChange} value={data.contactStatus} className="w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultValue="Invoice">Draft</option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.contactStatus}
                                </span>
                            </div>
                        </div>
                        <div className="block mb-5">
                            <label htmlFor="contactOwner" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                Contact Owner
                            </label>
                            <div className="d-block relative">
                            <input
                                type="search"
                                name="contactOwner"
                                onChange={handleRecordChange}
                                value={data.contactOwner}
                                className="rounded h-[50px] border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                                placeholder="Search by Company Member Name"
                                />
                            </div>
                            <span className="form-error text-error text-sm font-normal">
                                {errors && errors.contactOwner}
                            </span>
                        </div>
                        <div className="block mb-5">
                            <label htmlFor="leadSource" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                Lead Source 
                            </label>
                            <select name="leadSource" id="leadSource" onChange={handleRecordChange} value={data.leadSource} className="w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-base rounded-md focus:ring-blue-500 focus:border-blue-500 block py-3 px-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option>Please select...</option>
                                <option value="US">United States</option>
                                <option value="CA">Canada</option>
                                <option value="FR">France</option>
                                <option value="DE">Germany</option>
                            </select>
                            <span className="form-error text-error text-sm font-normal">
                                {errors && errors.leadSource}
                            </span>
                        </div>
                        <div className="flex columns-2 flex-wrap justify-between">
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="firstName" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    First Name
                                </label>
                                <div className="d-block relative">
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleRecordChange}
                                    value={data.firstName}
                                    className="rounded h-[50px] border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                                    />
                                </div>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.firstName}
                                </span>
                            </div>
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="lastName" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    Last Name
                                </label>
                                <div className="d-block relative">
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleRecordChange}
                                    value={data.lastName}
                                    className="rounded h-[50px] border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                                    />
                                </div>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.lastName}
                                </span>
                            </div>
                        </div>
                        <div className="flex columns-2 flex-wrap justify-between">
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="contactEmail" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    Contact Email
                                </label>
                                <div className="d-block relative">
                                <input
                                    type="text"
                                    name="contactEmail"
                                    onChange={handleRecordChange}
                                    value={data.contactEmail}
                                    className="rounded h-[50px] border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                                    />
                                </div>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.contactEmail}
                                </span>
                            </div>
                            <div className="block w-[48%] mb-5">
                                <label htmlFor="contactPhone" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                    Contact Phone
                                </label>
                                <div className="d-block relative">
                                <input
                                    type="text"
                                    name="contactPhone"
                                    onChange={handleRecordChange}
                                    value={data.contactPhone}
                                    className="rounded h-[50px] border border-input-border w-full p-3 px-5 text-base outline-none font-Karla"
                                    />
                                </div>
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.contactPhone}
                                </span>
                            </div>
                        </div>
                        <div className="block">
                            <label htmlFor="contactTags" className="text-base font-medium font-Karla text-light-dark tracking-[-.03em] mb-1 block">
                                Contact Tags
                            </label>
                            <div className="d-block mb-2 outline-0 relative">
                                <TagsInput
                                    onChange={setSelectedTag}
                                    value={selectedTag}
                                    name="contactTags"
                                    placeholder="Enter a tag and hit enter"
                                />
                            </div>
                            <span className="form-error text-error text-sm font-normal">
                                {errors && errors.contactTags}
                            </span>
                        </div>
                        <div className="flex justify-start mb-2 mt-4">
                            <button
                            type="submit"
                            className="rounded-md h-[39px] font-bold flex items-center tracking-[-.03em] min-w-[122px] justify-center text-sm bg-primary text-white py-2.5 px-3.5 font-Karla"
                            >
                            {loader ? (
                                <>
                                <box-icon
                                    name="loader-circle"
                                    class="fill-white mr-2"
                                    animation="spin"
                                ></box-icon>{" "}
                                Create Contact
                                </>
                            ) : (
                                "Create Contact"
                            )}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default CreateNewRecord;
