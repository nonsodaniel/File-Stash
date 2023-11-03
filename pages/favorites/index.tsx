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
import useFileList from "../../hooks/useFileList";
import TopHeader from "../../components/ui/TopHeader";
import EmptyState from "../../components/ui/EmptyState";
import FileList from "../../components/FileList/FileList";

export default function Home() {
  const { fetchAllFavoriteFiles, favoriteFileList, isFileLoading, fileList } =
    useFileList();

  useEffect(() => {
    fetchAllFavoriteFiles();
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
          ) : !!favoriteFileList.length ? (
            <FileList showHeader={true} fileList={favoriteFileList} />
          ) : (
            <EmptyState message="File" />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
