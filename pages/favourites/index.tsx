import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { RootFolderContext } from "../../context/RootFolderContext";
import { getFirestore } from "firebase/firestore";
import { app } from "../../config/firebaseConfig";
import FolderHeader from "../../components/Folder/FolderHeader";
import FolderList from "../../components/Folder/FolderList";
import useFolderList from "../../hooks/useFolderList";
import AppLayout from "../../components/layout/AppLayout";
import SearchBar from "../../components/ui/SearchBar";
import Loader from "../../components/ui/Loader";

export default function Home() {
  const { data: session } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);

  const db = getFirestore(app);
  const { isFolderLoading, folderList } = useFolderList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <SearchBar />
        <div
          className="p-5 mt-5 
        bg-white rounded-lg"
        >
          <FolderHeader type="Folders" isBig={true} />

          {isFolderLoading ? (
            <Loader />
          ) : folderList.length ? (
            <FolderList folderList={folderList} />
          ) : (
            <div className="">Folder list is currrently empty</div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
