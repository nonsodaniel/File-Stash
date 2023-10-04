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
import { DataContext } from "../context/DataContext";

const useFileList = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isFileLoading, setLoading] = useState(false);
  const userSession = session?.user;
  const docId = Date.now();
  const storage = getStorage(app);
  const { setToastMessage } = useContext(ShowToastContext);
  const { rootFolderId } = useContext(RootFolderContext);
  const { fileList, setFileList } = useContext(DataContext);

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
    const fileData = {
      name: file.name,
      type: file.name.split(".")[1],
      size: file.size,
      createdBy: session.user.email,
      modifiedAt: file.lastModified,
      imageUrl: "",
      rootFolderId,
      id: docId,
    };
    const fileReference = ref(storage, "file/" + file.name);
    uploadBytes(fileReference, file)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!", { snapshot });
      })
      .then(() => {
        getDownloadURL(fileReference).then(async (downloadUrl) => {
          fileData.imageUrl = downloadUrl;
          await setDoc(doc(db, "files", docId.toString()), fileData);
        });
      })
      .then(() => {
        setToastMessage({
          message: "File Uploaded Successfully!",
          status: "success",
        });
        console.log("fileData", fileData);
        setFileList((prevFileList) => [...prevFileList, fileData]);
      })
      .catch(() => {
        setToastMessage({
          message: "File upload failed",
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        closeModal(true);
      });
  };
  const onDeleteFile = async (file) => {
    // const deleteItem = fileList.filter((o) => o.id !== file.id);
    // console.log({ deleteItem });
    await deleteDoc(doc(db, "files", file.id.toString()))
      .then(() => {
        setToastMessage({
          message: "File Successfully Deleted",
          status: "success",
        });
        setFileList((prevFileList) =>
          prevFileList.filter((item) => item.id !== file.id)
        );
      })
      .catch(() => {
        setToastMessage({
          message: "File could not be deleted",
          status: "error",
        });
      });
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
  }, [userSession, setFileList, db, session]);

  return {
    isFileLoading,
    fileList,
    fetchAllFileList,
    handleUploadFile,
    onDeleteFile,
  };
};

export default useFileList;
