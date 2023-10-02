import React from "react";

const FolderHeader = ({ isBig, type }: { isBig: boolean; type?: string }) => {
  return (
    <div>
      {isBig ? (
        <h2
          className="text-[17px] 
        font-bold 
        items-center"
        >
          Recent {type}
        </h2>
      ) : null}
    </div>
  );
};

export default FolderHeader;
