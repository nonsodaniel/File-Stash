import React, { useContext, useEffect } from "react";
import moment from "moment/moment";
import Image from "next/image";
import useFileList from "../../hooks/useFileList";
import useFolderList from "../../hooks/useFolderList";
import { formatSize } from "../../utils/helpers";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getStorage, ref } from "firebase/storage";
import { app } from "../../config/firebaseConfig";
import { HiOutlineEye } from "react-icons/hi";

const FileItem = ({ file }) => {
  const image = "/" + file.type + ".png";
  // const { onDeleteFile } = useFileList();

  const deleteFile = () => {
    // onDeleteFile(file);
    // console.log({ fileList });
  };

  return (
    <div
      className="grid grid-cols-1
        md:grid-cols-2 justify-between
         hover:bg-gray-100
        p-3 rounded-md"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={image.replace("jpeg", "jpg")}
          alt="file-icon"
          width={26}
          height={20}
        />
        <h2
          className="text-[15px] truncate cursor-pointer"
          onClick={() => window.open(file.imageUrl)}
        >
          {file.name}
        </h2>
      </div>
      <div className="grid grid-cols-3 place-content-start">
        <h2 className="text-[15px]">
          {new Date(file.modifiedAt).toLocaleDateString()}
        </h2>

        <h2 className="text-[15px]">{formatSize(file.size)}</h2>
        <span id={file.id}>
          <RiDeleteBin6Line
            className=" cursor-pointer w-5 h-5 float-right text-red-500
               hover:scale-110 transition-all"
            onClick={deleteFile}
          />

          <HiOutlineEye
            className=" cursor-pointer text-blue-500
               hover:scale-110 transition-all"
            onClick={() => window.open(file.imageUrl)}
          />
        </span>
      </div>
    </div>
  );
};

export default FileItem;
