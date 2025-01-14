import Head from "next/head";
import React from "react";

interface HeaderProps {
  title: string;
}

const PortalHeader = ({ title }: HeaderProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" type="image/png" href="/favicon.png" />
    </Head>
  );
};

export default PortalHeader;
