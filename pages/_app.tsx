import { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";
import Storage from "../components/Storage/Storage";

import { ShowLoaderContext } from "../context/showLoaderContext";
import { DataContext } from "../context/DataContext";
import { useRouter } from "next/router";
import Login from "./login";
import AppLayout from "../components/layout/AppLayout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [rootFolderId, setRootFolderId] = useState();
  const [folderList, setFolderList] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, [session]);
  console.log("session", session);
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
              <Component {...pageProps} />
              {toastMessage && <Toast {...toastMessage} />}
            </ShowToastContext.Provider>
          </RootFolderContext.Provider>
        </ShowLoaderContext.Provider>
      </DataContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
