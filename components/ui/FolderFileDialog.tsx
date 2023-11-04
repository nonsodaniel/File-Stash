import React, { Fragment } from "react";
import CreateFolderModal from "./CreateFolderModal";
import UploadFileModal from "../FileList/UploadFileModal";

const FolderFileDialog = () => {
  return (
    <Fragment>
      {" "}
      <dialog id="my_modal_3" className="modal">
        <CreateFolderModal />
      </dialog>
      <dialog id="create_file_modal" className="modal">
        <UploadFileModal
          closeModal={() => globalThis.create_file_modal.close()}
        />
      </dialog>
    </Fragment>
  );
};

export default FolderFileDialog;
