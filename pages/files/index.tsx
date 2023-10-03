import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import { RootFolderContext } from "../../context/RootFolderContext";
import useFileList from "../../hooks/useFileList";
import FolderHeader from "../../components/Folder/FolderHeader";
import Loader from "../../components/Loader";
import FileList from "../../components/FileList/FileList";

export default function Home() {
  const { data: session } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);

  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
  }, [session]);

  return (
    <div className={"p-5 folder-section"}>
      <SearchBar />
      <div
        className="p-5 mt-5 
        bg-white rounded-lg"
      >
        <FolderHeader type="Files" isBig={true} />

        {isFileLoading ? (
          <Loader />
        ) : fileList.length ? (
          <FileList
            showHeader={false}
            fileList={fileList}
            isFileLoading={isFileLoading}
          />
        ) : (
          <div className="">File Is empty</div>
        )}
      </div>
    </div>
  );
}
