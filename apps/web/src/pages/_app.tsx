import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "@/styles/globals.css";
import "@/styles/toastify.css";

function CargoshipApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  );
}

export default CargoshipApp;
