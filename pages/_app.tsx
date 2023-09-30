import { useContext, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import { ShowToastContext } from "../context/ShowToastContext";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showToastMesage, setShowToastMessage] = useState();
  return (
    <SessionProvider session={session}>
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
              Storage
            </div>
          </div>
        </div>
        {showToastMesage && <Toast message={showToastMesage} />}
      </ShowToastContext.Provider>
    </SessionProvider>
  );
}

export default MyApp;
