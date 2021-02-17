import type { AppProps /*, AppContext */ } from "next/app";
import { RecoilRoot } from "recoil";
import "styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
