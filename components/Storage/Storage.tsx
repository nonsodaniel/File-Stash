import React, { useContext } from "react";
import UserInformation from "./UserInformation";
import StorageInformation from "./StorageInformation";
import { useSession } from "next-auth/react";
import StorageDetailList from "./StorageDetailsList";
import StorageUpgradeMessage from "./StorageUpgradeMessage";
import { DataContext } from "../../context/DataContext";
import useFolderList from "../../hooks/useFolderList";
import useFileList from "../../hooks/useFileList";

const Storage = () => {
  const { data: session } = useSession();
  const { isFolderLoading, folderList, fetchFolderList } = useFolderList();
  const { isFileLoading, fileList } = useFileList();
  console.log("storage", { fileList, folderList });
  return (
    session && (
      <div>
        <UserInformation />
        {!!fileList.length && (
          <>
            <StorageInformation fileList={fileList} />
            <StorageDetailList fileList={fileList} />
          </>
        )}

        <StorageUpgradeMessage />
      </div>
    )
  );
};

export default Storage;
