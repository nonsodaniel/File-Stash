import { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";
import Storage from "../components/Storage/Storage";

import { ShowLoaderContext } from "../context/showLoaderContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [rootFolderId, setRootFolderId] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SessionProvider session={session}>
      <ShowLoaderContext.Provider value={{ loading, setLoading }}>
        <RootFolderContext.Provider value={{ rootFolderId, setRootFolderId }}>
          <ShowToastContext.Provider value={{ toastMessage, setToastMessage }}>
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
         order-first md:order-last bg-white p-5 order-first md:order-last  h-screen sticky top-0 z-10"
                >
                  <Storage />
                </div>
              </div>
            </div>
            {toastMessage && <Toast {...toastMessage} />}
          </ShowToastContext.Provider>
        </RootFolderContext.Provider>
      </ShowLoaderContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
