import React from "react";
import UserInformation from "./UserInformation";
import StorageInformation from "./StorageInformation";
import StorageDetailList from "./StorageDetailsList";
// import StorageUpgradeMessage from "./StorageUpgradeMessage";
import useFileList from "../../hooks/useFileList";
import Loader from "../ui/Loader";

const Storage = () => {
  const { isFileLoading, storageData } = useFileList();

  return (
    <div>
      <UserInformation />

      <>
        <StorageInformation fileList={storageData} />
        <StorageDetailList fileList={storageData} />
      </>

      {isFileLoading && <Loader />}
      {/* <StorageUpgradeMessage /> */}
    </div>
  );
};

export default Storage;
