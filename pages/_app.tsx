import { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";
import Storage from "../components/Storage/Storage";

import { ShowLoaderContext } from "../context/showLoaderContext";
import { DataContext } from "../context/DataContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [rootFolderId, setRootFolderId] = useState();
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SessionProvider session={session}>
      <DataContext.Provider
        value={{ folderList, setFolderList, fileList, setFileList }}
      >
        <ShowLoaderContext.Provider value={{ loading, setLoading }}>
          <RootFolderContext.Provider value={{ rootFolderId, setRootFolderId }}>
            <ShowToastContext.Provider
              value={{ toastMessage, setToastMessage }}
            >
              <div className="flex flex-col sm:flex-row">
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
      </DataContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
