import SideNavBar from "../components/SideNavBar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
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
    </SessionProvider>
  );
}

export default MyApp;
