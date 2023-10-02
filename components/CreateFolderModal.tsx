import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { app } from "../config/firebaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { ShowToastContext } from "../context/ShowToastContext";
import { RootFolderContext } from "../context/RootFolderContext";

const CreateFolderModal = () => {
  const [folderName, setFolderName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, setToastMessage } = useContext(ShowToastContext);
  const { data: session } = useSession();
  const db = getFirestore(app);
  const docId = Date.now().toString();
  const { rootFolderId, setRootFolderId } = useContext(RootFolderContext);

  const createFolderHandler = async () => {
    setIsLoading(true);
    const postObj = {
      name: folderName,
      id: docId,
      createBy: session.user.email,
      rootFolderId,
    };
    setDoc(doc(db, "Folders", docId), postObj)
      .then(() => {
        console.log("Experiment success");
        setToastMessage({
          message: "Folder successfully created",
          status: "success",
        });
      })
      .catch(() => {
        console.log("Experiment failed");
        setToastMessage({
          message: "Folder creation failed",
          status: "error",
        });
      })
      .finally(() => {
        console.log("Experiment completed");
        setIsLoading(false);
      });
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
          />
          <button
            className="bg-blue-500
          text-white rounded-md p-2 px-3 w-full"
            onClick={() => createFolderHandler()}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFolderModal;
