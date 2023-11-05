import { useContext, useEffect } from "react";
import { RootFolderContext } from "../../context/RootFolderContext";
import FolderHeader from "../../components/Folder/FolderHeader";
import FolderList from "../../components/Folder/FolderList";
import useFolderList from "../../hooks/useFolderList";
import TopHeader from "../../components/ui/TopHeader";
import AppLayout from "../../components/layout/AppLayout";
import Loader from "../../components/ui/Loader";
import FolderFileDialog from "../../components/ui/FolderFileDialog";

export default function Home() {
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFolderLoading, folderList } = useFolderList();

  useEffect(() => {
    setRootFolderId(0);
  }, []);

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <TopHeader />
        <div
          className="p-5 mt-5 
        bg-white rounded-lg pb-11 h-100"
        >
          <FolderHeader type="Folders" isBig={true} />

          {isFolderLoading ? (
            <Loader />
          ) : folderList.length ? (
            <FolderList isFullScreen folderList={folderList} />
          ) : (
            <div className="">Folder list is currrently empty</div>
          )}
        </div>
        <FolderFileDialog />
      </div>
    </AppLayout>
  );
}
