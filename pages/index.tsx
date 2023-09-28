import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import SearchBar from "../components/SearchBar";
import FolderList from "../components/Folder/FolderList";
import { fileListData, folderList } from "../utils/db";
import FileList from "../components/FileList/FileList";

export default function Home() {
  return (
    <div className={"p-5"}>
      <SearchBar />
      <FolderList folderList={folderList} />
      <FileList fileList={fileListData} />
    </div>
  );
}
