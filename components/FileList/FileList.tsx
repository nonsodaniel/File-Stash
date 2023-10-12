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
        {showHeader && <h2 className="text-[18px] font-bold">Recent Files</h2>}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <FileHeader />
          <tbody>
            {fileList.map((item, index) => (
              <Fragment key={index}>
                <FileItem file={item} index={index} />
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FileList;
