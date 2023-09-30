import React, { useContext, useEffect } from "react";
import { ShowToastContext } from "../context/ShowToastContext";

function Toast({ message }: { message: string }) {
  const { showToastMessage, setShowToastMessage } =
    useContext(ShowToastContext);
  useEffect(() => {
    setInterval(() => {
      setShowToastMessage(null);
    }, 3000);
    console.log("fired");
  }, [showToastMessage]);
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
