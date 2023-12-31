import { useRouter } from "next/router";
import React, { useState } from "react";
import CreateFolderModal from "./CreateFolderModal";
import Link from "next/link";
import { AiOutlineFolderAdd, AiOutlineFileAdd } from "react-icons/ai";
import { useMenuList } from "../../hooks/useMenuList";

const SideNavBar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter();
  const { menuListData } = useMenuList();

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
    router.push("/");
  };
  return (
    <div
      className="side-navbar w-[200px]
    bg-white h-screen sticky top-0
    z-10 shadow-blue-200 shadow-md
    p-5"
    >
      <div className="flex justify-center">
        <Link
          className="text-2xl font-bold text-blue-500 tracking-wide"
          href="/"
        >
          File <span className="text-yellow-500">Stash</span>
        </Link>
      </div>

      <button
        className="flex gap-2 items-center text-[13px]
        bg-blue-500 bg-opacity-75 p-2 text-white rounded-md px-3
        hover:scale-105 transition-all mt-5 w-full justify-center"
        onClick={() => globalThis.create_file_modal.showModal()}
      >
        Add New File
        <span>
          <AiOutlineFileAdd style={{ fontSize: "25px" }} />
        </span>
      </button>
      <button
        className="flex gap-2 items-center text-[13px]
        bg-sky-400 w-full p-2 justify-center text-white rounded-md px-3
        hover:scale-105 transition-all mt-1"
        onClick={() => globalThis.my_modal_3.showModal()}
      >
        Create Folder
        <span>
          <AiOutlineFolderAdd style={{ fontSize: "25px" }} />
        </span>
      </button>
      <div className="mt-8">
        {menuListData.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className={`flex gap-2 items-center
            p-2 mt-3 text-gray-500 rounded-md cursor-pointer ${
              item.isSoon ? "pointer-events-none" : ""
            }
            hover:bg-blue-500 hover:text-white
            ${router.pathname == item.url ? "bg-blue-500 text-white" : ""}`}
            onClick={() => onMenuClick(item, index)}
          >
            <span style={{ fontSize: "25px" }}>{item.logo}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideNavBar;
