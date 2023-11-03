import React from "react";
import UserInformation from "./UserInformation";
import StorageInformation from "./StorageInformation";
import { useSession } from "next-auth/react";
import StorageDetailList from "./StorageDetailsList";
// import StorageUpgradeMessage from "./StorageUpgradeMessage";
import useFileList from "../../hooks/useFileList";
import Loader from "../ui/Loader";

const Storage = () => {
  const { data: session } = useSession();
  const { isFileLoading, storageData } = useFileList();

  return (
    session && (
      <div>
        <UserInformation />
        {!!storageData.length && (
          <>
            <StorageInformation fileList={storageData} />
            <StorageDetailList fileList={storageData} />
          </>
        )}
        {isFileLoading && <Loader />}
        {/* <StorageUpgradeMessage /> */}
      </div>
    )
  );
};

export default Storage;
