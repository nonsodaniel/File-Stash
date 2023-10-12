import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useMenuList } from "../../hooks/useMenuList";
import { useRouter } from "next/router";

const Footer = () => {
  const { mobileMenuListData } = useMenuList();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const router = useRouter();

  const onMenuClick = (item, index) => {
    setActiveIndex(index);
    router.push("/");
  };
  return (
    <div
      className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white
     border border-gray-200 rounded-full
      bottom-1 left-1/2 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        {mobileMenuListData.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className={
              "inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
            }
            onClick={() => onMenuClick(item, index)}
          >
            <span style={{ fontSize: "25px" }}>{item.logo}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
