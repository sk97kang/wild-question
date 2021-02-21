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
        <meta
          name="description"
          content="엉뚱하지만 궁금해! 엉뚱한 질문을 올려보세요"
        />
        <meta name="keywords" content="question,wild,질문,엉뚱" />
        <link rel="shortcut icon" href="/img/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
