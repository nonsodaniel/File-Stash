import { useContext, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";
import UserInformation from "../components/Storage/UserInformation";
import Storage from "../components/Storage/Storage";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showToastMesage, setShowToastMessage] = useState();
  const [rootFolderId, setRootFolderId] = useState();
  return (
    <SessionProvider session={session}>
      <RootFolderContext.Provider value={{ rootFolderId, setRootFolderId }}>
        <ShowToastContext.Provider
          value={{ showToastMesage, setShowToastMessage }}
        >
          <div className="flex">
            <SideNavBar />
            <div
              className="grid grid-cols-1
        md:grid-cols-3 w-full"
            >
              <div className="col-span-2">
                <Component {...pageProps} />
              </div>
              <div
                className="bg-white p-5
         order-first md:order-last"
              >
                <Storage />
              </div>
            </div>
          </div>
          {showToastMesage && <Toast message={showToastMesage} />}
        </ShowToastContext.Provider>
      </RootFolderContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
