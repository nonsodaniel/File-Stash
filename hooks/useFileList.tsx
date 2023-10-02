import { useEffect, useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { useSession } from "next-auth/react";

const useFileList = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [isFileLoading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const userSession = session?.user;

  useEffect(() => {
    const fetchFileList = async () => {
      setLoading(true);
      setFileList([]); // Clear existing folder list

      try {
        const q = query(
          collection(db, "files"),
          where("rootFolderId", "==", 0),
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

    if (userSession) {
      fetchFileList();
    }
  }, [userSession]);

  return { isFileLoading, fileList };
};

export default useFileList;
