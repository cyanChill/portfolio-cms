import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="tinymce-script" src="/tinymce/tinymce.min.js" />
      </body>
    </Html>
  );
};

export default Document;
