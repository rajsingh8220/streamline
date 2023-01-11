import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AccountDetails = () => {
  const userData = useSelector((state) => state.user.user);
  return (
    <div className="block">
      <h2 className="mb-8 text-text-dark font-Karla text-[22px] font-bold">
        Account details
      </h2>
      <div className="block mb-5">
        <h4 className="text-light-dark mb-0 font-Karla font-bold text-base">
          Organization ID
        </h4>
        <p className="text-light-gray font-Karla text-base">
          {userData?.organizationId}
        </p>
      </div>
      <div className="flex columns-2 mb-5">
        <div className="block w-[50%]">
          <h4 className="text-light-dark mb-0 font-Karla font-bold text-base">
            Instance URL
          </h4>
          <p className="text-light-gray font-Karla text-base">
            {userData?.instanceUrl}
          </p>
        </div>
        <div className="block w-[50%]">
          <h4 className="text-light-dark mb-0 font-Karla font-bold text-base">
            Company admin
          </h4>
          <p className="text-light-gray font-Karla text-base">
            {userData?.firstName && userData?.lastName
              ? userData?.firstName + " " + userData?.lastName
              : ""}{" "}
            <Link to="/" className="text-xs text-primary underline">
              Transfer ownership
            </Link>
          </p>
        </div>
      </div>
      <hr />
      <div className="block my-5">
        <h4 className="text-light-dark mb-0 font-Karla font-bold text-base">
          Delete company account
        </h4>
        <p className="font-Karla text-sm text-light-dark">
          After you remove all member accounts from the company and only the
          management account remains, you can proceed to delete the company.{" "}
        </p>
      </div>
      <div className="block">
        <button
          type="button"
          className="text-primary text-sm font-medium bg-white border border-primary h-10 tracking-[-.03em] rounded-md px-3.5"
        >
          Delete company account
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
