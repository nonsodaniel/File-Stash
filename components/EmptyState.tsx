import React from "react";
import { TbMoodEmpty } from "react-icons/tb";

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <TbMoodEmpty className="w-32 h-32 mb-4" />
      <p className="text-gray-500 text-lg text-center">
        Oops! {message} list is Empty.
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Try adding some {message}s to see content here.
      </p>
    </div>
  );
};

export default EmptyState;
