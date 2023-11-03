import React, { Fragment, useState } from "react";
import Image from "next/image";
import useFileList from "../../hooks/useFileList";
import { formatSize } from "../../utils/helpers";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const FileItem = ({ file, index }) => {
  const [isFileInFavorites, setIsFileInFavorites] = useState(file.isFavorite);
  const image = "/" + file.type + ".png";
  const { onDeleteFile, updateFavoriteInFile } = useFileList();

  const deleteFile = () => {
    onDeleteFile(file);
  };
  const handleFileFavorite = () => {
    setIsFileInFavorites((prevState) => {
      const updatedValue = !prevState;
      updateFavoriteInFile(file, updatedValue);
      return updatedValue;
    });
  };

  const Icon = isFileInFavorites ? AiFillHeart : AiOutlineHeart;

  return (
    <Fragment>
      <td className="px-6 py-4">{index + 1}</td>
      <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
        <div className="flex gap-2 items-center">
          <Image
            src={image.replace(/jpeg|bmp|tiff|svg|webp|xml|jpg/i, "jpg")}
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
        <Icon
          className=" cursor-pointer w-5 h-5 float-right text-red-500
             hover:scale-110 transition-all"
          onClick={handleFileFavorite}
        />
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
