import React from "react";
import { Link } from "react-router-dom";
import "boxicons";

const RegisterSuccess = () => {
  return (
    <div className="card md:flex-1 w-full min-h-[65vh] md:min-w-[680px] md:max-w-[680px] flex flex-col justify-start border border-module-border bg-white rounded-md xl:p-16 xs:p-6">
      <h1 className="text-3xl text-dark tracking-[-.03em] font-bold pb-3 font-Karla w-[70%]">
        Your account has been successfully created.
      </h1>
      <p className="text-base text-light-gray tracking-[-.03em] pb-2 font-Karla mb-4">
        Pellentesque commodo volutpat tincidunt. Fusce lacinia eu nulla vitae
        dapibus. Phasellus commodo ullamcorper tellus.
      </p>
      <div className="flex justify-start mb-2 mt-5">
        <Link
          to="/login"
          className="rounded-md text-lg font-bold bg-primary min-w-[139px] text-white py-4 px-6 font-Karla"
        >
          Get started
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccess;
