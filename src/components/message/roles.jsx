import React from "react";
import CloseIcon from "./../../assets/icons/close-icon.svg";
import { Link } from "react-router-dom";

const Roles = ({
  val,
  index,
  handleDeleteOpen,
  handleEditClick,
  handleDuplicate,
  handleViewDetails
}) => {

  return (
      <div
        key={index}
        className="w-[48%] mb-4 sm:flex sm:items-start label relative"
      >
        <div className="label-text border-2 border-module-border relative rounded-xl p-6 w-full text-gray-500 bg-white cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-primary hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600  dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-light-gray">
          <div className="flex items-start">
            <div className="text-center space-y-2 sm:text-left">
              <div className="space-y-0.5 w-full">
                <p className="text-xl text-dark font-bold font-Karla mb-1">
                  {val.role + " "}
                  <button
                    onClick={() => handleEditClick(val)}
                    className="text-primary text-xs underline font-medium"
                  >
                    Rename
                  </button>
                </p>
                <p className="text-light-dark min-h-[20px] text-sm font-medium font-Karla">
                  {val.description}
                </p>
              </div>
            </div>
          </div>
          {index === 0 ? (
            ""
          ) : (
            <button
              className="block absolute top-3 right-3"
              type="button"
              onClick={() => handleDeleteOpen(val)}
            >
              <img src={CloseIcon} alt="close icon" className="w-3" />
            </button>
          )}
          <div className="flex items-center mt-4 columns-2 ml-0">
            <button
              type="button"
              onClick={() => handleViewDetails(val)}
              className="text-primary flex items-center text-sm bg-white border border-primary h-10 tracking-[-.03em] rounded-md px-3.5"
            >
              View permission details
            </button>
          </div>
          <div className="flex justify-end absolute right-3.5 bottom-4">
            {index === 0 ? (
              ""
            ) : (
              <button
                // to={val.linkUrl}
                type="button"
                onClick={() => handleDuplicate(val)}
                className="text-primary flex items-center justify-end text-xs bg-white underline tracking-[-.03em] rounded-md px-3.5"
              >
                Duplicate card
              </button>
            )}
          </div>
        </div>
      </div>
  );
};

export default Roles;
