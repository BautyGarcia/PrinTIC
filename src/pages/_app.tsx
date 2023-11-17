import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Button, MantineProvider, createTheme, rem } from '@mantine/core';
import { api } from "~/utils/api";

import "~/styles/globals.css";
const theme = createTheme({

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
