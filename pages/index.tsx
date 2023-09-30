import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import FolderList from "../components/Folder/FolderList";
import { fileListData } from "../utils/db";
import FileList from "../components/FileList/FileList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../config/firebaseConfig";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [folderList, setFolderList] = useState([]);

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

  useEffect(() => {
    if (session?.user) {
      console.log({ session });
      getFolderList();
    }
  }, [session]);
  console.log(folderList);
  return (
    <div className={"p-5"}>
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileListData} />
    </div>
  );
}
