import { APP_NAME } from "common/constants";
import type { AppProps /*, AppContext */ } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import "styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>{APP_NAME}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/img/favicon.ico" sizes="64x64" />

        <meta name="title" content="엉궁해" />
        <meta
          name="description"
          content="엉뚱하지만 궁금해! 엉뚱한 질문을 공유해보세요."
        />
        <meta name="keyword" content="Question, Comment, Wild, 질문, 엉뚱" />
        <meta name="author" content="Kan" />

        <meta property="og:title" content="엉궁해" />
        <meta
          property="og:description"
          content="엉뚱하지만 궁금해! 엉뚱한 질문을 공유해보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://wild-question.netlify.app/" />
        <meta property="og:image" content="/img/logo.png" />
        <meta property="og:site_name" content="엉궁해" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
