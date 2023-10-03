import { useContext, useEffect, useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { ShowToastContext } from "../context/ShowToastContext";
import { RootFolderContext } from "../context/RootFolderContext";

const useFileList = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isFileLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userSession = session?.user;
  const docId = Date.now();
  const storage = getStorage(app);
  const { setToastMessage } = useContext(ShowToastContext);
  const { rootFolderId } = useContext(RootFolderContext);

  const handleUploadFile = (file, closeModal) => {
    if (file) {
      if (file?.size > 1000000) {
        setToastMessage({
          message: "File is too large",
          status: "error",
        });
        return;
      }

      createFile(file, closeModal);
    }
  };

  const createFile = (file, closeModal) => {
    const fileReference = ref(storage, "file/" + file.name);
    uploadBytes(fileReference, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", { snapshot });
      })
      .then(() => {
        getDownloadURL(fileReference).then(async (downloadUrl) => {
          await setDoc(doc(db, "files", docId.toString()), {
            name: file.name,
            type: file.name.split(".")[1],
            size: file.size,
            createdBy: session.user.email,
            modifiedAt: file.lastModified,
            rootFolderId,
            imageUrl: downloadUrl,
            id: docId,
          });
        });
      });

    closeModal(true);
    setToastMessage({
      message: "File Uploaded Successfully!",
      status: "success",
    });
  };
  const onDeleteFile = async (file) => {
    // const deleteItem = fileList.filter((o) => o.id !== file.id);
    // console.log({ deleteItem });
    await deleteDoc(doc(db, "files", file.id.toString())).then((resp) => {
      setToastMessage({
        message: "File Successfully Deleted",
        status: "success",
      });
    });

    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.id !== file.id)
    );
  };
  const fetchAllFileList = async () => {
    setLoading(true);
    setFileList([]); // Clear existing folder list

    try {
      const q = query(
        collection(db, "files"),

        where("createdBy", "==", session.user.email)
      );

      const querySnapshot = await getDocs(q);

      const fetchedFileList = [];
      querySnapshot.forEach((doc) => {
        fetchedFileList.push(doc.data());
      });

      setFileList(fetchedFileList);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchAllFileList();
    }
  }, [userSession]);

  return {
    isFileLoading,
    fileList,
    handleUploadFile,
    fetchAllFileList,
    setFileList,
    onDeleteFile,
  };
};

export default useFileList;
