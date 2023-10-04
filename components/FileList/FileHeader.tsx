import React, { Fragment } from "react";

const FileHeader = ({ showHeader }) => {
  return (
    <Fragment>
      {showHeader && <h2 className="text-[18px] font-bold">Recent Files</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 text-[13px] font-semibold border-b-[1px] pb-2 mt-3 border-gray-300 text-gray-400">
        <h2>Name</h2>
        <div className="grid grid-cols-3">
          <h2>Modified</h2>
          <h2>Size</h2>
        </div>
      </div>
    </Fragment>
  );
};

export default FileHeader;
