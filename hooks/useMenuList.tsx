import { ReactNode } from "react";
import { AiOutlineHome, AiOutlineFile } from "react-icons/ai";
import { FiFolder } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";

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
    logo: <GrFavorite style={{ color: "red" }} />,
    url: "/favourites",
    isSoon: true,
  },
];

export const useMenuList = () => {
  return menuListData;
};
