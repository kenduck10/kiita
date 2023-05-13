import type { ReactElement, ReactNode } from 'react';
import '@/styles/global.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Layout from '@/components/layouts/Layout';
import { RecoilRoot } from 'recoil';
import NextNProgress from 'nextjs-progressbar';
import { Router } from 'next/router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/config/theme';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, router: Router) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page, router) => <Layout>{page}</Layout>);
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNProgress options={{ showSpinner: false }} />
        {getLayout(<Component {...pageProps} />, router)}
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default MyApp;
