import React, { Fragment, useState } from "react";
import FolderItem from "./FolderItem";
import { useRouter } from "next/router";
import FolderItemSmall from "./FolderItemSmall";

interface IFolderListProps {
  folderList: any;
  isBig?: boolean;
  isFullScreen?: boolean;
}

function FolderList({
  folderList,
  isFullScreen,
  isBig = true,
}: IFolderListProps) {
  const [, setActiveFolder] = useState();
  const router = useRouter();
  const onFolderClick = (index, item) => {
    setActiveFolder(index);
    router.push({
      pathname: "/folder/" + item.id,
      query: {
        name: item.name,
        id: item.id,
      },
    });
  };
  return (
    <Fragment>
      {isBig ? (
        <div
          className={`folder-grid grid grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5 mt-3
        gap-4  ${!isFullScreen && "max-h-full overflow-y-scroll"}`}
          style={{ height: isFullScreen && "auto" }}
        >
          {folderList.map((item, index) => (
            <div key={index} onClick={() => onFolderClick(index, item)}>
              <FolderItem folder={item} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className=" 
      "
        >
          {folderList.map((item, index) => (
            <div key={index} onClick={() => onFolderClick(index, item)}>
              <FolderItemSmall folder={item} />
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
}

export default FolderList;
