import React from "react";
import { AiOutlineFileAdd, AiOutlineFolderAdd } from "react-icons/ai";

const RoundedRightButton = () => {
  return (
    <>
      <div
        className="fixed bottom-28 right-4 h-50 w-50  
        bg-sky-400 bg-opacity-75 p-3  flex items-center
       justify-center rounded-full z-10"
        style={{ bottom: "12rem" }}
      >
        <span
          className="text-white"
          onClick={() =>
            //@ts-ignore
            window.my_modal_3.showModal()
          }
        >
          <AiOutlineFolderAdd style={{ fontSize: "20px" }} />
        </span>
      </div>
      <div
        className="fixed  right-4 h-50 w-50  
       bg-blue-500 bg-opacity-75 p-3  flex items-center 
       justify-center rounded-full z-10"
        style={{ bottom: "7rem" }}
      >
        <span
          className="text-white"
          onClick={() =>
            //@ts-ignore
            window.create_file_modal.showModal()
          }
        >
          <AiOutlineFileAdd style={{ fontSize: "20px" }} />
        </span>
      </div>
    </>
  );
};

export default RoundedRightButton;
