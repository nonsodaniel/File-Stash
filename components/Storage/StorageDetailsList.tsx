import React, { useEffect, useState } from "react";
import StorageDetailItem from "./StorageDetailItem";
import { formatSize, logoList, sumNumbers } from "../../utils/helpers";

const StorageDetailList = ({ fileList }) => {
  const [categorizedFiles, setCategorizedFiles] = useState({
    Images: [],
    Videos: [],
    Documents: [],
    Others: [],
  });

  useEffect(() => {
    // Categorize files when fileList changes
    const categorizeFiles = () => {
      const imagesList = [];
      const videoList = [];
      const documentList = [];
      const otherList = [];

      fileList.forEach((file) => {
        const fileType = getFileType(file.type);

        switch (fileType) {
          case "Images":
            imagesList.push(file);
            break;
          case "Videos":
            videoList.push(file);
            break;
          case "Documents":
            documentList.push(file);
            break;
          default:
            otherList.push(file);
            break;
        }
      });

      // Update categorizedFiles state
      setCategorizedFiles({
        Images: imagesList,
        Videos: videoList,
        Documents: documentList,
        Others: otherList,
      });
    };

    categorizeFiles();
  }, [fileList]);

  const getFileType = (fileType) => {
    if (["jpeg", "jpg", "png"].includes(fileType)) {
      return "Images";
    } else if (["mov", "mp4"].includes(fileType)) {
      return "Videos";
    } else if (["docx", "pdf"].includes(fileType)) {
      return "Documents";
    } else {
      return "Others";
    }
  };
  const categorizedFilesList = Object.keys(categorizedFiles);
  return (
    <>
      {categorizedFilesList.map((category) => {
        const files = categorizedFiles[category];
        return (
          <StorageDetailItem
            item={{
              type: category,
              totalFile: files.length || 0,
              size: formatSize(sumNumbers(files)) || 0, // You can calculate the size if needed
              logo: getLogoByCategory(category),
            }}
            key={category}
          />
        );
      })}
    </>
  );
};

const getLogoByCategory = (category) => {
  // You can define the logos for each category here
  const logos = {
    Images: logoList.imageLogo, // Insert the actual logo here
    Videos: logoList.videoLogo,
    Documents: logoList.documentLogo,
    Others: logoList.otherLogo,
  };

  return logos[category] || "..."; // Provide a default logo if needed
};

export default StorageDetailList;
