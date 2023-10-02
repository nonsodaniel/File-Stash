import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import FolderList from "../components/Folder/FolderList";
import FileList from "../components/FileList/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { RootFolderContext } from "../context/RootFolderContext";
import { ShowLoaderContext } from "../context/showLoaderContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { rootFolderId, setRootFolderId } = useContext(RootFolderContext);
  const { loading, setLoading } = useContext(ShowLoaderContext);

  const db = getFirestore(app);

  const getFolderList = async () => {
    setLoading(true);
    setFolderList([]);
    try {
      const q = query(
        collection(db, "Folders"),
        where("createBy", "==", session.user?.email)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setFolderList((folderList) => [...folderList, doc.data()]);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getFileList = async () => {
    setLoading(true);
    setFileList([]);
    try {
      const q = query(
        collection(db, "files"),
        where("rootFolderId", "==", 0),
        where("createdBy", "==", session.user.email)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFileList((fileList) => [...fileList, doc.data()]);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getFolderList();
      getFileList();
    }
    setRootFolderId(0);
  }, [session]);
  return (
    <div className={"p-5 folder-section"}>
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
