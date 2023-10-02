import React, { useEffect, useState } from "react";
import { formatSize, sumNumbers } from "../../utils/helpers";

const StorageInformation = ({ fileList }) => {
  const totalSize = sumNumbers(fileList);
  return (
    <div className="mt-7">
      <h2
        className="text-[22px] 
       font-bold"
      >
        {formatSize(totalSize)}{" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div
        className="w-full
        bg-gray-200  h-2.5 flex"
      >
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[35%]"></div>
        <div className="bg-yellow-400 h-2.5 w-[15%]"></div>
      </div>
    </div>
  );
};

export default StorageInformation;
