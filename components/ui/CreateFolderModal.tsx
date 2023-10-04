import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { serverTimestamp } from "firebase/firestore";
import { RootFolderContext } from "../../context/RootFolderContext";
import useFolderList from "../../hooks/useFolderList";

const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState<string>("");
  const { data: session } = useSession();
  const docId = Date.now().toString();
  const { rootFolderId } = useContext(RootFolderContext);
  const { createFolderHandler } = useFolderList();

  const createFolder = async () => {
    const folderData = {
      name: folderName,
      id: docId,
      createdBy: session.user.email,
      createdAt: serverTimestamp(),
      rootFolderId,
    };
    createFolderHandler(folderData, setFolderName).then(() =>
      setFolderName("")
    );
  };

  return (
    <div>
      <form method="dialog" className="modal-box p-9 items-center">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div
          className="w-full items-center 
        flex flex-col justify-center gap-3"
        >
          <Image src="/folder.png" alt="folder" width={50} height={50} />
          <input
            type="text"
            placeholder="Folder Name"
            className="p-2 border-[1px] outline-none
                rounded-md"
            onChange={(e: any) => setFolderName(e.target.value)}
            autoFocus
          />
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={() => createFolder()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderModal;
