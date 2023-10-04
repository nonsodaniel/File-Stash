import React from "react";
import { BiArrowBack } from "react-icons/bi";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

const TopHeader = ({ showBackBtn = true }: { showBackBtn?: boolean }) => {
  const router = useRouter();
  return (
    <div>
      <div className="flex items-center">
        {showBackBtn && (
          <BiArrowBack
            className="mr-4 text-gray-800 cursor-pointer"
            onClick={() => router.back()}
          />
        )}
        <div className="flex-grow">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
