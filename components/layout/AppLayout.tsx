import React from "react";
import Storage from "../Storage/Storage";
import SideNavBar from "../ui/SideNavBar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <SideNavBar />
      <div
        className="grid grid-cols-1
md:grid-cols-3 w-full"
      >
        <div className="col-span-2">{children}</div>
        <div
          className="hidden md:block bg-white p-5
order-first md:order-last bg-white p-5 order-first md:order-last  h-screen sticky top-0 z-10"
        >
          <Storage />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
