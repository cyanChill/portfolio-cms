import Head from "next/dist/shared/lib/head";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import "prismjs/themes/prism-tomorrow.css";

import "../styles/globals.css";
import FileSystemLayout from "../components/Layout/FileSystemLayout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>CMS For Anthony&apos;s Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster
        position="bottom center"
        toastOptions={{ style: { width: "max-content", maxWidth: "45rem" } }}
      />

      <FileSystemLayout>
        <Component {...pageProps} />
      </FileSystemLayout>
    </SessionProvider>
  );
}

export default MyApp;
