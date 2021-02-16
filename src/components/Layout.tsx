import React from "react";
import Head from "next/head";
import Link from "next/link";
import { APP_NAME } from "../common/constants";

interface ILayoutProps {
  title?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  children,
  title = APP_NAME,
}) => {
  const onLoginClick = () => {
    console.log("Login");
  };

  const onCreateAccountClick = () => {
    console.log("Create Account");
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
            <li className="mr-4">
              <button onClick={onLoginClick}>로그인</button>
            </li>
            <li>
              <button onClick={onCreateAccountClick}>회원가입</button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-screen-md mx-auto">{children}</main>
    </div>
  );
};
