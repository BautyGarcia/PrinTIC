import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ToastContainer } from 'react-toastify';
import Background from "~/components/utils/background";

import "~/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

const MyApp: AppType<{ session: Session | null }> = ({
Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
        <Background />
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          pauseOnHover
          theme="dark"
          hideProgressBar
          closeButton
          closeOnClick
          limit={3}
          style={{
            
          }}
        />
      </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
