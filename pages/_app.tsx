import { Fragment, useState } from "react";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { RootFolderContext } from "../context/RootFolderContext";

import { ShowLoaderContext } from "../context/showLoaderContext";
import { DataContext } from "../context/DataContext";
import Toast from "../components/ui/Toast";
import Logo from "../components/ui/Logo";

function MyApp({ Component, pageProps: { status, session, ...pageProps } }) {
  const [toastMessage, setToastMessage] = useState(null);
  const [rootFolderId, setRootFolderId] = useState();
  const [folderList, setFolderList] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [favoriteFileList, setFavoriteFile] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="app bg-white-200">
      <SessionProvider session={session}>
        <Fragment>
          <DataContext.Provider
            value={{
              folderList,
              setFolderList,
              fileList,
              setFileList,
              favoriteFileList,
              setFavoriteFile,
              searchQuery,
              setSearchQuery,
            }}
          >
            <ShowLoaderContext.Provider value={{ loading, setLoading }}>
              <RootFolderContext.Provider
                value={{ rootFolderId, setRootFolderId }}
              >
                <ShowToastContext.Provider
                  value={{ toastMessage, setToastMessage }}
                >
                  <div className="mobile-logo justify-center py-8">
                    <Logo />
                  </div>

                  <Component {...pageProps} />
                  {toastMessage && <Toast {...toastMessage} />}
                </ShowToastContext.Provider>
              </RootFolderContext.Provider>
            </ShowLoaderContext.Provider>
          </DataContext.Provider>
        </Fragment>
        )
      </SessionProvider>
    </div>
  );
}

export default MyApp;
