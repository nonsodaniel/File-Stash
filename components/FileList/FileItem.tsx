import React, { Fragment } from "react";
import Image from "next/image";
import useFileList from "../../hooks/useFileList";
import { formatSize } from "../../utils/helpers";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";

const FileItem = ({ file, index }) => {
  const image = "/" + file.type + ".png";
  const { onDeleteFile } = useFileList();

  const deleteFile = () => {
    onDeleteFile(file);
  };

  return (
    <Fragment>
      <td className="px-6 py-4">{index + 1}</td>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        <div className="flex gap-2 items-center">
          <Image
            src={image.replace(/jpeg|jpg/i, "jpg")}
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
      </th>
      <td className="text-center py-4">{formatSize(file.size)}</td>
      <td className="px-6 py-4">
        {new Date(file.modifiedAt).toLocaleDateString()}
      </td>

      <td className="px-6 py-4">
        <HiOutlineEye
          id={file.id}
          className=" cursor-pointer text-blue-500
               hover:scale-110 transition-all"
          onClick={() => window.open(file.imageUrl)}
        />
      </td>
      <td className="px-6 py-4">
        <RiDeleteBin6Line
          id={file.id}
          className=" cursor-pointer w-5 h-5 float-right text-red-500
               hover:scale-110 transition-all"
          onClick={deleteFile}
        />
      </td>
    </Fragment>
  );
};

export default FileItem;
