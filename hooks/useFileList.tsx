import { useContext, useEffect, useRef, useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  getFirestore,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { useSession } from "next-auth/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ShowToastContext } from "../context/ShowToastContext";
import { RootFolderContext } from "../context/RootFolderContext";
import { DataContext } from "../context/DataContext";

const useFileList = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isFileLoading, setLoading] = useState(false);
  const userSession = session?.user;
  const storage = getStorage(app);
  const { setToastMessage } = useContext(ShowToastContext);
  const { rootFolderId } = useContext(RootFolderContext);
  const { fileList, setFileList, favoriteFileList, setFavoriteFile } =
    useContext(DataContext);
  const [fileByIdList, setFileByIdList] = useState([]);
  const [] = useState([]);

  const handleUploadFile = (
    file,
    closeModal,
    setUploadProgress,
    setSelectedFile
  ) => {
    if (file) {
      if (file?.size > 1100000) {
        setToastMessage({
          message: "File is too large",
          status: "error",
        });
        setSelectedFile(null);
        return;
      }
      // return;
      createFile(file, closeModal, setUploadProgress, setSelectedFile);
    }
  };

  const createFile = (file, closeModal, setUploadProgress, setSelectedFile) => {
    const docId = Date.now();
    const fileData = {
      name: file.name,
      type: file.name.split(".")[1],
      size: file.size,
      createdBy: session.user.email,
      modifiedAt: file.lastModified,
      imageUrl: "",
      rootFolderId,
      id: docId,
      isFavorite: false,
    };
    const fileReference = ref(storage, "file/" + file.name);

    // Create the upload task
    const uploadTask = uploadBytesResumable(fileReference, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file: ", error);
        setToastMessage({
          message: "File upload failed",
          status: "error",
        });
      },
      () => {
        getDownloadURL(fileReference).then(async (downloadUrl) => {
          fileData.imageUrl = downloadUrl;
          await setDoc(doc(db, "Files", docId.toString()), fileData);
          setToastMessage({
            message: "File Uploaded Successfully!",
            status: "success",
          });
          setFileList((prevFileList) => [...prevFileList, fileData]);
          setSelectedFile(null);
          closeModal(true);
        });
      }
    );

    return uploadTask; // Return the upload task
  };
  const fetchAllFileList = async () => {
    setLoading(true);

    try {
      const q = query(
        collection(db, "Files"),

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

  const fetchAllFavoriteFiles = async () => {
    setLoading(true);
    if (!!fileList.length) {
      const filteredData = fileList.filter((favFile) => favFile.isFavorite);
      console.log("calls", fileList, filteredData);
      setFavoriteFile(filteredData);
    }
    setLoading(false);
  };

  const fetchFileById = (id) => {
    if (!!fileList.length && id) {
      const filteredData = fileList.filter(
        (folder) => folder.rootFolderId === id
      );
      setFileByIdList(filteredData);
    }
  };

  const updateFavoriteInFile = async (file, isFavorite) => {
    setLoading(true);
    const fileData = {
      ...file,
      isFavorite,
    };
    console.log("fileData", { fileData, file, isFavorite });
    const documentRef = doc(db, "Files", file.id.toString());

    // Update the document with the new data
    updateDoc(documentRef, fileData)
      .then(() => {
        const filteredData = fileList.filter((favFile) => favFile.isFavorite);
        setFavoriteFile(filteredData);
        console.log("Document successfully updated!", {
          filteredData,
          fileList,
        });
        return filteredData;
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
      .finally(() => setLoading(false));
  };

  const onDeleteFile = async (file) => {
    const deleteItem = fileList.filter((o) => o.id !== file.id);
    await deleteDoc(doc(db, "Files", file.id.toString()))
      .then(() => {
        setToastMessage({
          message: "File Successfully Deleted",
          status: "success",
        });
        setFileList(deleteItem);
      })
      .catch(() => {
        setToastMessage({
          message: "File could not be deleted",
          status: "error",
        });
      });
  };

  useEffect(() => {
    if (userSession) {
      fetchAllFileList();
    }
  }, []);
  return {
    isFileLoading,
    fileList,
    fetchAllFileList,
    handleUploadFile,
    onDeleteFile,
    fetchFileById,
    fileByIdList,
    setFileByIdList,
    updateFavoriteInFile,
    favoriteFileList,
    fetchAllFavoriteFiles,
  };
};

export default useFileList;
