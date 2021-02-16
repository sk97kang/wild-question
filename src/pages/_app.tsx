import { authService } from "firebase.confg";
import type { AppProps /*, AppContext */ } from "next/app";
import { useEffect, useState } from "react";
import "styles/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<any>(null);
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
