import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="tinymce-script"
          src="/tinymce/tinymce.min.js"
          strategy="beforeInteractive"
        />
        <Script
          id="prism-script"
          type="text/javascript"
          src="/prism/prism.js"
          strategy="beforeInteractive"
          data-manual
        />
      </body>
    </Html>
  );
};

export default Document;
