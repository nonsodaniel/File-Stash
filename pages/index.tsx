import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import FolderList from "../components/Folder/FolderList";
import FileList from "../components/FileList/FileList";
import { RootFolderContext } from "../context/RootFolderContext";
import useFolderList from "../hooks/useFolderList";
import useFileList from "../hooks/useFileList";
import FolderHeader from "../components/Folder/FolderHeader";
import FileHeader from "../components/FileList/FileHeader";
import TopHeader from "../components/ui/TopHeader";
import AppLayout from "../components/layout/AppLayout";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import Footer from "../components/mobile/Footer";

export default function Home() {
  const { data: session } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFolderLoading, folderList } = useFolderList();
  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <TopHeader showBackBtn={false} />
        <div
          className="p-5 mt-5 
        bg-white rounded-lg"
        >
          <FolderHeader isBig={true} />

          {isFolderLoading ? (
            <Loader />
          ) : folderList.length > 0 ? (
            <FolderList folderList={folderList} />
          ) : (
            <EmptyState message="Folder" />
          )}
        </div>

        <div className="bg-white mt-5 p-5 rounded-lg">
          {/* <FileHeader /> */}

          {isFileLoading ? (
            <Loader />
          ) : folderList.length > 0 ? (
            <FileList fileList={fileList} />
          ) : (
            <EmptyState message="File" />
          )}
        </div>
      </div>
      <div className="mobile-footer">
        <Footer />
      </div>
    </AppLayout>
  );
}
