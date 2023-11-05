import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import FolderList from "../components/Folder/FolderList";
import FileList from "../components/FileList/FileList";
import { RootFolderContext } from "../context/RootFolderContext";
import useFolderList from "../hooks/useFolderList";
import useFileList from "../hooks/useFileList";
import FolderHeader from "../components/Folder/FolderHeader";
import TopHeader from "../components/ui/TopHeader";
import AppLayout from "../components/layout/AppLayout";
import Loader from "../components/ui/Loader";
import EmptyState from "../components/ui/EmptyState";
import CreateFolderModal from "../components/ui/CreateFolderModal";
import UploadFileModal from "../components/FileList/UploadFileModal";
import { useRouter } from "next/router";

export default function Home() {
  const { data: session, status } = useSession();
  const { setRootFolderId } = useContext(RootFolderContext);
  const router = useRouter();

  const { isFolderLoading, folderList } = useFolderList();
  const { isFileLoading, fileList } = useFileList();

  useEffect(() => {
    setRootFolderId(0);
    if (status && status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status == "loading")
    return (
      <div className="h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );

  return (
    <AppLayout>
      <div className={"p-5 folder-section"}>
        <TopHeader showBackBtn={false} />

        <div
          className="p-5 mt-5 
        bg-white rounded-lg"
        >
          <FolderHeader isBig={true} type="Folder" />
          {isFolderLoading && <Loader />}

          {!isFolderLoading && !!folderList.length && (
            <FolderList folderList={folderList} />
          )}
          {!isFolderLoading && !folderList.length && (
            <EmptyState message="Folder" />
          )}
        </div>
      </div>

      <div className="p-5 file-section">
        <div className="bg-white mt-5 p-5 rounded-lg">
          {isFileLoading && <Loader />}

          {!isFileLoading && !!fileList.length && (
            <FileList fileList={fileList} showHeader header="All Files" />
          )}
          {!isFileLoading && !fileList.length && (
            <EmptyState message="Folder" />
          )}
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>

      <dialog id="create_file_modal" className="modal">
        <UploadFileModal
          closeModal={() => globalThis.create_file_modal.close()}
        />
      </dialog>
    </AppLayout>
  );
}
