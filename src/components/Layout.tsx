import React from "react";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME } from "common/constants";
import { authService } from "firebase.confg";
import { Avatar } from "./Avatar";
import { useRouter } from "next/dist/client/router";
import { useUser } from "hooks/useUser";

interface ILayoutProps {
  title?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  children,
  title = APP_NAME,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const onLoginClick = () => {
    router.push("/login");
  };

  const onLogoutClick = () => {
    authService.signOut();
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
                  <Avatar name={user.name} image={user.image} />
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
