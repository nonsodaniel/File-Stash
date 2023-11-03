import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { RootFolderContext } from "../../context/RootFolderContext";
import useFileList from "../../hooks/useFileList";
import FileList from "../../components/FileList/FileList";
import TopHeader from "../../components/ui/TopHeader";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/ui/Loader";
import EmptyState from "../../components/ui/EmptyState";

export default function Home() {
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
  }, []);

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
          ) : !!fileList.length ? (
            <FileList showHeader={true} fileList={fileList} />
          ) : (
            <EmptyState message="File" />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
