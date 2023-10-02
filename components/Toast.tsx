import React, { useContext, useEffect } from "react";
import { ShowToastContext } from "../context/ShowToastContext";
interface IToastProps {
  message: string;
  status: string;
}

function Toast({ message, status }: IToastProps) {
  const { toastMessage, setToastMessage } = useContext(ShowToastContext);
  useEffect(() => {
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, [toastMessage]);
  return (
    <div className="toast toast-top toast-end z-10">
      <div className={`alert alert-${status}`}>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;
