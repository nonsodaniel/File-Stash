import React from "react";
import Storage from "../Storage/Storage";
import SideNavBar from "../ui/SideNavBar";
import RoundedRightButton from "../ui/RoundedRightButton";
import Footer from "../mobile/Footer";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <SideNavBar />
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1  w-full main-content">
        <div className="col-span-2">{children}</div>
        <div className="storage-section bg-white p-5 order-first md:order-last bg-white p-5 order-first  h-screen sticky top-0 z-10 ">
          <Storage />
        </div>
      </div>

      <RoundedRightButton />

      <div className="mobile-footer">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
