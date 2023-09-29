import React, { useContext, useEffect } from "react";

function Toast({}) {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{"Hello toast"}</span>
      </div>
    </div>
  );
}

export default Toast;
