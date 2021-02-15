import React from "react";
import Head from "next/head";
import { APP_NAME } from "../common/constants";

interface ILayoutProps {
  title?: string;
}

export const Layout: React.FC<ILayoutProps> = ({
  children,
  title = APP_NAME,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </div>
  );
};
