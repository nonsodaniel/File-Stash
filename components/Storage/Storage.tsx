import React from "react";
import UserInformation from "./UserInformation";
import StorageInformation from "./StorageInformation";
import { useSession } from "next-auth/react";
import StorageDetailList from "./StorageDetailsList";
import StorageUpgradeMessage from "./StorageUpgradeMessage";

const Storage = () => {
  const { data: session } = useSession();
  return (
    session && (
      <div>
        <UserInformation />
        <StorageInformation />
        <StorageDetailList />
        <StorageUpgradeMessage />
      </div>
    )
  );
};

export default Storage;
