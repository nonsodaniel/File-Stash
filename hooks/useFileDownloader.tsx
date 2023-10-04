// useDownloadFile.js
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../config/firebaseConfig";

const useDownloadFile = (file) => {
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const downloadFile = () => {
    const storage = getStorage(app);
    getDownloadURL(ref(storage, "file/" + file.name))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'

        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open("GET", url);
        xhr.send();
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  return { downloadUrl, isLoading, error, downloadFile };
};

export default useDownloadFile;
