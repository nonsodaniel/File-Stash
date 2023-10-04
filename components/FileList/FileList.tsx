import React from "react";
import FileItem from "./FileItem";
import FileHeader from "./FileHeader";

interface IFileListProps {
  fileList: any[];
  showHeader?: boolean;
}

function FileList({ fileList, showHeader }: IFileListProps) {
  return (
    <div className="bg-white mt-5  rounded-lg">
      {showHeader && <FileHeader showHeader />}
      {fileList.map((item, index) => (
        <div key={index}>
          <FileItem file={item} key={index} />
        </div>
      ))}
    </div>
  );
}

export default FileList;
