import React from "react";

const FolderHeader = ({ isBig }: { isBig: boolean }) => {
  return (
    <div>
      {isBig ? (
        <h2
          className="text-[17px] 
        font-bold 
        items-center"
        >
          Recent Folders
          <span
            className="float-right
        text-blue-400 font-normal
        text-[13px]"
          >
            View All
          </span>
        </h2>
      ) : null}
    </div>
  );
};

export default FolderHeader;
