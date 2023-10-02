import React from "react";

const Loader = () => {
  return (
    <div className="flex flex items-center justify-center">
      <span className="loading loading-bars loading-xs"></span>
      <span className="loading loading-bars loading-sm"></span>
      <span className="loading loading-bars loading-md"></span>
      <span className="loading loading-bars loading-lg"></span>
    </div>
  );
};

export default Loader;
