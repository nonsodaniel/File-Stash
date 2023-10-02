import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { app } from "../../config/firebaseConfig";
import { formatSize } from "../../utils/helpers";

const StorageInformation = () => {
  const { data: session } = useSession();
  const db = getFirestore(app);
  const [totalSizeUsed, setTotalSizeUsed] = useState(0);
  const [imageSize, setImageSize] = useState(0);

  const [fileList, setFileList] = useState([]);
  let totalSize = 0;
  useEffect(() => {
    if (session) {
      totalSize = 0;
      getAllFiles();
    }
  }, [session]);

  useEffect(() => {
    setImageSize(formatSize(fileList, ["png", "jpg"]));
  }, [fileList]);
  const getAllFiles = async () => {
    const q = query(
      collection(db, "files"),
      where("createdBy", "==", session.user.email)
    );
    const querySnapshot = await getDocs(q);
    setFileList([]);
    querySnapshot.forEach((doc) => {
      totalSize = totalSize + doc.data()["size"];
      setFileList((fileList) => [...fileList, doc.data()]);
    });
    console.log({ totalSize });
    setTotalSizeUsed(formatSize(totalSize));
  };

  console.log({ size: formatSize(totalSize) });

  return (
    <div className="mt-7">
      <h2
        className="text-[22px] 
       font-bold"
      >
        {totalSizeUsed}{" "}
        <span
          className="text-[14px]
        font-medium"
        >
          used of{" "}
        </span>{" "}
        50 MB
      </h2>
      <div
        className="w-full
        bg-gray-200  h-2.5 flex"
      >
        <div className="bg-blue-600 h-2.5 w-[25%]"></div>
        <div className="bg-green-600 h-2.5 w-[35%]"></div>
        <div className="bg-yellow-400 h-2.5 w-[15%]"></div>
      </div>
    </div>
  );
};

export default StorageInformation;
