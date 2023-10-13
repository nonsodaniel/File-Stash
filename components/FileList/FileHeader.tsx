import React, { Fragment } from "react";

const FileHeader = ({}) => {
  return (
    <Fragment>
      <tr>
        <th scope="col" className="px-6 py-3">
          #
        </th>
        <th scope="col" className="px-6 py-3">
          Name
        </th>
        <th scope="col" className="px-6 py-3">
          Size
        </th>
        <th scope="col" className="px-6 py-3">
          Modified
        </th>
      </tr>
    </Fragment>
  );
};

export default FileHeader;
