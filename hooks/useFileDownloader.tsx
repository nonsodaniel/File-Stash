import { useState } from "react";

const useDownloadFile = () => {
  const [error, setError] = useState(null);

  const downloadFile = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "downloaded-file"; // Set the desired file name
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return { downloadFile, error };
};

export default useDownloadFile;
