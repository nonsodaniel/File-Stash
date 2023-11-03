import { ReactNode } from "react";
import { AiOutlineHome, AiOutlineFile } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

interface MenuListProps {
  id: number;
  name: string;
  logo: ReactNode;
  url: string;
  isSoon?: boolean;
}

const menuListData: MenuListProps[] = [
  {
    id: 1,
    name: "Home",
    logo: <AiOutlineHome />,
    url: "/",
  },
  {
    id: 2,
    name: "My Folders",
    logo: <FiFolder />,
    url: "/folders",
  },
  {
    id: 3,
    name: "My Files",
    logo: <AiOutlineFile />,
    url: "/files",
  },
  {
    id: 4,
    name: "Favorites",
    logo: <FcLike style={{ color: "red" }} />,
    url: "/favorites",
  },
];
const mobileMenuListData: MenuListProps[] = [
  {
    id: 1,
    name: "Home",
    logo: <AiOutlineHome />,
    url: "/",
  },
  {
    id: 2,
    name: "My Folders",
    logo: <FiFolder />,
    url: "/folders",
  },
  {
    id: 3,
    name: "My Files",
    logo: <AiOutlineFile />,
    url: "/files",
  },
  {
    id: 4,
    name: "Favorites",
    logo: <FcLike />,
    url: "/favorites",
    isSoon: true,
  },
  {
    id: 5,
    name: "Profile",
    logo: <CgProfile />,
    url: "/profile",
    isSoon: true,
  },
];

export const useMenuList = () => {
  return { menuListData, mobileMenuListData };
};
