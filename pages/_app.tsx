import { useEffect, useState } from "react";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";

import { ShowLoaderContext } from "../context/showLoaderContext";
import { DataContext } from "../context/DataContext";
import { useRouter } from "next/router";
import Toast from "../components/ui/Toast";
import Footer from "../components/mobile/Footer";
import RoundedRightButton from "../components/ui/RoundedRightButton";

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
  return (
    <div className="app bg-white-200" style={{ paddingBottom: "5rem" }}>
      <SessionProvider session={session}>
        <DataContext.Provider
          value={{ folderList, setFolderList, fileList, setFileList }}
        >
          <ShowLoaderContext.Provider value={{ loading, setLoading }}>
            <RootFolderContext.Provider
              value={{ rootFolderId, setRootFolderId }}
            >
              <ShowToastContext.Provider
                value={{ toastMessage, setToastMessage }}
              >
                <Component {...pageProps} />
                {toastMessage && <Toast {...toastMessage} />}
              </ShowToastContext.Provider>
            </RootFolderContext.Provider>
          </ShowLoaderContext.Provider>
        </DataContext.Provider>
        <RoundedRightButton />
        <Footer />
      </SessionProvider>
    </div>
  );
}

export default MyApp;
