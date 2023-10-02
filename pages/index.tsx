import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import FolderList from "../components/Folder/FolderList";
import FileList from "../components/FileList/FileList";
import { getFirestore } from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { RootFolderContext } from "../context/RootFolderContext";
import useFolderList from "../hooks/useFolderList";
import useFileList from "../hooks/useFileList";
import FolderHeader from "../components/Folder/FolderHeader";
import Loader from "../components/Loader";

export default function Home() {
  const { data: session } = useSession();
  const { rootFolderId, setRootFolderId } = useContext(RootFolderContext);

  const db = getFirestore(app);

  const { isFolderLoading, folderList, fetchFolderList } = useFolderList();
  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);
  console.log("asa", { isFolderLoading, folderList });

  console.log("affected", folderList);

  return (
    <div className={"p-5 folder-section"}>
      <SearchBar />
      <div
        className="p-5 mt-5 
        bg-white rounded-lg"
      >
        <FolderHeader isBig={true} />

        {isFolderLoading ? (
          <Loader />
        ) : folderList.length ? (
          <FolderList folderList={folderList} />
        ) : (
          <div className="">Folder Is empty</div>
        )}
      </div>

      <FileList fileList={fileList} isFileLoading={isFileLoading} />
    </div>
  );
}
