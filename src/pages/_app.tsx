import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { MantineProvider, createTheme } from '@mantine/core';
import { api } from "~/utils/api";

import "~/styles/globals.css";
const theme = createTheme({
  fontFamily: 'Comic sans ms, Open Sans, sans-serif',
  primaryColor: 'purple',
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider theme={theme}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
