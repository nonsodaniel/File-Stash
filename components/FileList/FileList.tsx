import React, { Fragment } from "react";
import FileItem from "./FileItem";
import FileHeader from "./FileHeader";

interface IFileListProps {
  fileList: any[];
  showHeader?: boolean;
}

function FileList({ fileList, showHeader }: IFileListProps) {
  return (
    <div className="bg-white mt-5 p-1 rounded-lg">
      <div className="relative overflow-x-auto  sm:rounded-lg">
        {showHeader && (
          <h1 className="text-[25px] font-bold text-center  mb-6">
            Recent Files
          </h1>
        )}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase  border-bottom-gray-300">
            <FileHeader />
          </thead>
          <tbody>
            {fileList.map((item, index) => (
              <tr key={item.id} className="bg-white border-b hover:bg-gray-200">
                <FileItem file={item} index={index} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
