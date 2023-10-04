import { useContext, useEffect, useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  setDoc,
  doc,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { ShowToastContext } from "../context/ShowToastContext";
import { app } from "../config/firebaseConfig";
import { useSession } from "next-auth/react";
import { DataContext } from "../context/DataContext";

const useFolderList = () => {
  const { data: session } = useSession();
  const [isFolderLoading, setLoading] = useState(false);

  const userSession = session?.user;

  const { setToastMessage } = useContext(ShowToastContext);
  const { folderList, setFolderList } = useContext(DataContext);
  const db = getFirestore(app);

  const createFolderHandler = async (folderData, setFolderName) => {
    setLoading(true);
    await setDoc(doc(db, "Folders", folderData.id), folderData)
      .then(() => {
        setToastMessage({
          message: "Folder successfully created!",
          status: "success",
        });
        setFolderList((prevFolderList) => [...prevFolderList, folderData]);
      })
      .catch(() => {
        setToastMessage({
          message: "Folder creation failed",
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
        setFolderName("");
      });
  };
  const fetchFolderList = async () => {
    setLoading(true);
    setFolderList([]); // Clear existing folder list

    try {
      const q = query(
        collection(db, "Folders"),
        where("createdBy", "==", session.user?.email)
      );

      const querySnapshot = await getDocs(q);

      const fetchedFolderList = [];
      querySnapshot.forEach((doc) => {
        fetchedFolderList.push(doc.data());
      });

      setFolderList(fetchedFolderList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onDeleteFolder = async (id) => {
    await deleteDoc(doc(db, "Folders", id.toString()))
      .then(() => {
        setToastMessage({
          message: "Folder Successfully Deleted",
          status: "success",
        });
        setFolderList((prevFolderList) =>
          prevFolderList.filter((item) => item.id !== id)
        );
      })
      .catch(() => {
        setToastMessage({
          message: "Folder could not be deleted",
          status: "error",
        });
      });
  };
  useEffect(() => {
    if (userSession) {
      fetchFolderList();
    }
  }, [userSession]);

  return {
    isFolderLoading,
    folderList,
    fetchFolderList,
    createFolderHandler,
    onDeleteFolder,
  };
};

export default useFolderList;
