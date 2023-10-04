import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { RootFolderContext } from "../../context/RootFolderContext";
import useFileList from "../../hooks/useFileList";
import FolderHeader from "../../components/Folder/FolderHeader";
import Loader from "../../components/Loader";
import FileList from "../../components/FileList/FileList";
import TopHeader from "../../components/TopHeader";
import EmptyState from "../../components/EmptyState";
import AppLayout from "../../components/layout/AppLayout";

export default function Home() {
  const { data: session } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <TopHeader />
        <div
          className="p-5 mt-5 
        bg-white rounded-lg"
        >
          {isFileLoading ? (
            <Loader />
          ) : fileList.length ? (
            <FileList showHeader={true} fileList={fileList} />
          ) : (
            <EmptyState message="File" />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
