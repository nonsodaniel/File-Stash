import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { RootFolderContext } from "../../context/RootFolderContext";
import FolderHeader from "../../components/Folder/FolderHeader";
import Loader from "../../components/Loader";
import FolderList from "../../components/Folder/FolderList";
import useFolderList from "../../hooks/useFolderList";
import TopHeader from "../../components/TopHeader";
import AppLayout from "../../components/layout/AppLayout";

export default function Home() {
  const { data: session } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFolderLoading, folderList } = useFolderList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <TopHeader />
        <div
          className="p-5 mt-5 
        bg-white rounded-lg pb-11"
        >
          <FolderHeader type="Folders" isBig={true} />

          {isFolderLoading ? (
            <Loader />
          ) : folderList.length ? (
            <FolderList isFullScreen={false} folderList={folderList} />
          ) : (
            <div className="">Folder list is currrently empty</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
