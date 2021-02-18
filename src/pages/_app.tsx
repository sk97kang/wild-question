import { Layout } from "components/Layout";
import type { AppProps /*, AppContext */ } from "next/app";
import { RecoilRoot } from "recoil";
import "styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
