import React from "react";
import { useState } from "react";
import toast from "toastr";
import ArrowRight from "./../../assets/icons/right-arrow.svg";

const ContactSettingDetails = () => {
    toast.options = { preventDuplicates: true };
    const [openResetPassword, setOpenResetPassword] = useState(false);
    const [loader, setLoader] = useState(false);
    const onOpenReSetPasswordModal = () => setOpenResetPassword(true);
    const [status, setStatus] = useState("");
    const [errors, setErrors] = useState(null);

    const onCloseModal = () => {
        setErrors(null);
        setLoader(false);
    };

    return (
        <div className="flex columns-2 justify-between">
            <div className="md:w-[66%]">
                <div className="block bg-white border border-light-border2- mb-5 rounded-lg px-8 py-9">
                    <div className="block relative">
                        <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
                            Contact info
                        </h1>
                        <div className="flex justify-between column-2">
                            <div className="flex column-2 md:w-[48%] justify-between">
                                <div className="block md:w-[48%] mb-4">
                                    <label
                                        htmlFor="agentStatus"
                                        className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                    >
                                        Agent Status
                                    </label>
                                    <select
                                        id="agentStatus"
                                        name="agentStatus"
                                        className="max-w-[168px] w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={status}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>{" "}
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                                <div className="block md:w-[48%] mb-4">
                                    <label
                                        htmlFor="leadSource"
                                        className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                    >
                                        Lead Source
                                    </label>
                                    <select
                                        id="leadSource"
                                        name="leadSource"
                                        className="max-w-[168px] w-full h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={status}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="active">Active</option>{" "}
                                        <option value="suspended">Suspended</option>
                                    </select>
                                </div>
                            </div>
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="contactOwner"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Contact Owner
                                </label>
                                <input
                                    type="text"
                                    name="contactOwner"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                    maxLength={15}
                                />
                            </div>
                        </div>
                        <div className="flex columns-2 justify-between mb-4">
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="firstName"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                    maxLength={15}
                                />
                            </div>
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="lastName"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                    maxLength={15}
                                />
                            </div>
                        </div>
                        <div className="flex columns-2 justify-between mb-4">
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="contactEmail"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    disabled={true}
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                />
                            </div>
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="phone"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="mobile_phone"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                    maxLength={15}
                                />
                                <span className="form-error text-error text-sm font-normal">
                                    {errors && errors.mobile_phone}
                                </span>
                            </div>
                        </div>
                        <div className="d-block w-full mb-4">
                            <label
                                htmlFor="contactTags"
                                className="text-base font-Karla text-light-dark font-medium block mb-1"
                            >
                                Contact Tags
                            </label>
                            <input
                                type="text"
                                name="contactTags"
                                className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                placeholder=""
                                maxLength={15}
                            />
                        </div>
                        <div className="flex justify-end mb-2">
                            <button
                                type="button"
                                onClick={onCloseModal}
                                className="rounded-md mr-2 h-[56px] text-lg bg-white flex items-center tracking-[-.03em] font-bold border-primary text-primary border-2 py-5 px-6 font-Karla"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-md font-bold h-[56px] flex items-center tracking-[-.03em] justify-center text-lg bg-primary text-white py-5 px-6 font-Karla"
                            >
                                {loader ? (
                                    <>
                                        <box-icon
                                            name="loader-circle"
                                            class="fill-white mr-2"
                                            animation="spin"
                                        ></box-icon>{" "}
                                        Save
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="block bg-white border border-light-border2 rounded-lg px-8 py-9">
                    <div className="block relative">
                        <h1 className="text-xl text-dark tracking-[-.03em] font-bold pb-5 font-Karla mt-1">
                            Payment Settings
                        </h1>
                        <div className="block w-[48%] mb-4">
                            <label
                                htmlFor="userStatus"
                                className="text-base font-medium font-Karla text-light-dark mb-1 block"
                            >
                                Default Selling Commission Amount and Type
                            </label>
                            <div className="flex columns-2 justify-between">
                                <input
                                    type="text"
                                    name="point"
                                    className="rounded border w-[35%] border-input-border p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder="2.5"
                                />
                                <select
                                    id="percentage"
                                    name="percentage"
                                    className="w-[60%] h-[50px] border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="Percentage (%)">Percentage (%)</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex columns-2 justify-between mb-4">
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="accountOwnerName"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Account Owner Name (optional)
                                </label>
                                <input
                                    type="text"
                                    name="accountOwnerName"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                />
                            </div>
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="bankName"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Bank Name (optional)
                                </label>
                                <input
                                    type="text"
                                    name="bankName"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="flex columns-2 justify-between mb-4">
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="accountNumber"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Account Number (optional)
                                </label>
                                <input
                                    type="email"
                                    name="accountNumber"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                />
                            </div>
                            <div className="block w-[48%] mb-2 relative">
                                <label
                                    htmlFor="routingNumber"
                                    className="text-base font-medium font-Karla text-light-dark mb-1 block"
                                >
                                    {" "}
                                    Routing Number (optional)
                                </label>
                                <input
                                    type="text"
                                    name="routingNumber"
                                    className="rounded border border-input-border w-full p-3 px-5 h-[50px] text-lg outline-none font-Karla"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="flex justify-end mb-2">
                            <button
                                type="button"
                                onClick={onCloseModal}
                                className="rounded-md mr-2 h-[56px] text-lg bg-white flex items-center tracking-[-.03em] font-bold border-primary text-primary border-2 py-5 px-6 font-Karla"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="rounded-md font-bold h-[56px] flex items-center tracking-[-.03em] justify-center text-lg bg-primary text-white py-5 px-6 font-Karla"
                            >
                                {loader ? (
                                    <>
                                        <box-icon
                                            name="loader-circle"
                                            class="fill-white mr-2"
                                            animation="spin"
                                        ></box-icon>{" "}
                                        Save
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-[32%]">
                <div className="py-5 px-4 bg-white border border-light-border2 rounded">
                    <h5 className="text-black font-Karla mb-4 text-sm font-bold">
                        Related entities
                    </h5>
                    <select
                        id="property"
                        className="min-w-[151px] w-full  border border-input-border cursor-pointer text-light-dark text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="property">Property</option>
                    </select>
                    <div className="block">
                        <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
                            <div className="block">
                                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                                    #568920
                                </span>
                                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                                    Listing Price: $ 000,000.00
                                </h4>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Listing Price: $ 000,000.00
                                </span>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Property Type: Single Family
                                </span>
                            </div>
                            <div className="flex justify-end w-[10%]">
                                <button className="border-none">
                                    <img src={ArrowRight} alt="arrow right"></img>{" "}
                                </button>
                            </div>
                        </div>
                        <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
                            <div className="block">
                                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                                    #568920
                                </span>
                                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                                    Listing Price: $ 000,000.00
                                </h4>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Listing Price: $ 000,000.00
                                </span>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Property Type: Single Family
                                </span>
                            </div>
                            <div className="flex justify-end w-[10%]">
                                <button className="border-none">
                                    <img src={ArrowRight} alt="arrow right"></img>{" "}
                                </button>
                            </div>
                        </div>
                        <div className="flex columns-2 items-center justify-between mt-4 border border-light-border rounded-lg p-4 pr-3">
                            <div className="block">
                                <span className="font-Karla text-sm font-bold text-light-grey mb-1">
                                    #568920
                                </span>
                                <h4 className="font-Karla text-lg text-dark font-bold mb-1">
                                    Listing Price: $ 000,000.00
                                </h4>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Listing Price: $ 000,000.00
                                </span>
                                <span className="font-Karla block text-sm text-light-grey">
                                    Property Type: Single Family
                                </span>
                            </div>
                            <div className="flex justify-end w-[10%]">
                                <button className="border-none">
                                    <img src={ArrowRight} alt="arrow right"></img>{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex columns-2 justify-between mt-4">
                        <button
                            type="button"
                            className="rounded-md text-sm font-bold bg-white border-primary text-primary text-left border py-2 px-4 font-Karla"
                        >
                            Add Property
                        </button>
                        <button
                            type="button"
                            className="rounded-md text-sm font-bold bg-white border-primary text-primary text-left border py-2 px-4 font-Karla"
                        >
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactSettingDetails;
