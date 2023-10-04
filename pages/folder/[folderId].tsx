import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import FolderList from "../../components/Folder/FolderList";
import { RootFolderContext } from "../../context/RootFolderContext";
import FileList from "../../components/FileList/FileList";
import useFolderList from "../../hooks/useFolderList";
import TopHeader from "../../components/ui/TopHeader";
import useFileList from "../../hooks/useFileList";
import AppLayout from "../../components/layout/AppLayout";
import EmptyState from "../../components/ui/EmptyState";
import HorizontalLine from "../../components/ui/HorizontalLine";
import Loader from "../../components/ui/Loader";

function FolderDetails() {
  const router = useRouter();
  const { name, id } = router.query;
  const { data: session } = useSession();

  const { setRootFolderId } = useContext(RootFolderContext);
  const {
    onDeleteFolder,
    fetchFolderById,
    folderByIdList,
    folderList,
    isFolderLoading,
  } = useFolderList();
  const { fetchFileById, isFileLoading, fileByIdList } = useFileList();
  useEffect(() => {
    setRootFolderId(id);
    if (session?.user && folderList.length) {
      fetchFolderById(id);
      fetchFileById(id);
    }
  }, [id, session, folderList]);

  const handleDeleteFolders = () => {
    onDeleteFolder(id).then(() => router.push("/folders"));
  };
  return (
    <AppLayout>
      <div className="p-5">
        <TopHeader showBackBtn />
        <h2 className="text-[20px] font-bold mt-5">
          {name}
          <span onClick={handleDeleteFolders}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 float-right text-red-500
           hover:scale-110 transition-all cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </span>
        </h2>

        {isFolderLoading ? (
          <Loader /> // Show loading state while data is being fetched
        ) : folderByIdList.length > 0 ? (
          <FolderList folderList={folderByIdList} isBig={false} /> // Show folder list when data is available
        ) : (
          <EmptyState message="Folder" /> // Show empty state when no data is available
        )}

        <HorizontalLine />

        <div
          className="p-5 mt-5 
        bg-white rounded-lg"
        >
          {isFileLoading ? (
            <Loader /> // Show loading state while data is being fetched
          ) : fileByIdList.length > 0 ? (
            <FileList fileList={fileByIdList} showHeader />
          ) : (
            <EmptyState message="File" /> // Show empty state when no data is available
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default FolderDetails;
