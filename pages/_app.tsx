import SideNavBar from "../components/SideNavBar";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <SideNavBar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
