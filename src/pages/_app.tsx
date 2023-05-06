import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import Layout from '../components/Layout';
import '../styles/index.css';

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <Head>
        <title>NoRamp Near Demo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster position="bottom-right" />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
