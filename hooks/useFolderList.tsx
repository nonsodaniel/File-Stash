import { useContext, useEffect, useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  setDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import { ShowToastContext } from "../context/ShowToastContext";
import { app } from "../config/firebaseConfig";
import { useSession } from "next-auth/react";

const useFolderList = () => {
  const { data: session } = useSession();
  const [isFolderLoading, setLoading] = useState(false);
  const [folderList, setFolderList] = useState([]);
  const userSession = session?.user;

  const { setToastMessage } = useContext(ShowToastContext);
  const db = getFirestore(app);

  const createFolderHandler = async (folderData, setFolderName) => {
    setLoading(true);
    await setDoc(doc(db, "Folders", folderData.id), folderData)
      .then(() => {
        setToastMessage({
          message: "Folder successfully created!",
          status: "success",
        });
      })
      .catch(() => {
        setToastMessage({
          message: "Folder creation failed",
          status: "error",
        });

        setFolderList((prevFolderList) => [...prevFolderList, folderData]);
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
  useEffect(() => {
    if (userSession) {
      fetchFolderList();
    }
  }, [userSession]);

  return { isFolderLoading, folderList, fetchFolderList, createFolderHandler };
};

export default useFolderList;
