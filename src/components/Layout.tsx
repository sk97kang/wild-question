import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME } from "common/constants";
import { authService, firebaseInstance } from "firebase.confg";
import { useRecoilState } from "recoil";
import { userState } from "stores/user";
import { Avatar } from "./Avatar";

interface ILayoutProps {
  title?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  children,
  title = APP_NAME,
}) => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(user => {
      if (user) {
        const currentUser = {
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          uid: user.uid,
        };
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onLoginClick = () => {
    googleLogin();
  };

  const onLogoutClick = () => {
    authService.signOut();
  };

  const googleLogin = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header className="bg-indigo-500 text-white">
        <nav className="max-w-screen-md mx-auto flex justify-between items-center p-4">
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
          </ul>
          <ul className="flex">
            {!user && (
              <li className="mr-4">
                <button onClick={onLoginClick}>로그인</button>
              </li>
            )}
            {user && (
              <>
                <li>
                  <Avatar name={user.displayName} image={user.photoURL} />
                </li>
                <li className="mr-4">
                  <button onClick={onLogoutClick}>로그아웃</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main className="max-w-screen-md mx-auto pb-10 px-4 md:px-0">
        {children}
      </main>
    </div>
  );
};
