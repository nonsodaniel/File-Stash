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
  query,
  where,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";
import { RootFolderContext } from "../context/RootFolderContext";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { rootFolderId, setRootFolderId } = useContext(RootFolderContext);

  const db = getFirestore(app);

  const getFolderList = async () => {
    setFolderList([]);
    const q = query(
      collection(db, "Folders"),
      where("createBy", "==", session.user?.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      setFolderList((folderList) => [...folderList, doc.data()]);
    });
  };

  const getFileList = async () => {
    setFileList([]);
    const q = query(
      collection(db, "files"),
      where("rootFolderId", "==", 0),
      where("createdBy", "==", session.user.email)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setFileList((fileList) => [...fileList, doc.data()]);
    });
  };

  useEffect(() => {
    if (session?.user) {
      console.log({ session });
      getFolderList();
      getFileList();
    }
    setRootFolderId(0);
  }, [session]);
  console.log({ fileList });
  return (
    <div className={"p-5"}>
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileList} />
    </div>
  );
}
