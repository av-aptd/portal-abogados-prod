import React from "react";
import { useRouter } from "next/router";
import { NotFound } from "components/icons";
import Link from "next/link";
import Head from "next/head";

const Custom404 = () => {
  const router = useRouter();
  console.log(router);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Página no encontrada</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <div className="border-b fixed inset-x-0 z-50 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="py-4 flex justify-center ">
            <img src="/Logo-aptd.png" className="h-12" alt="logo" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl pt-32 px-4">
        <div className="py-20 bg-white rounded-lg border">
          <NotFound className="mx-auto w-20 h-20 text-secondary" />
          <h3 className="text-center text-gray-700 font-medium mt-4 text-lg">
            Página no encontrada
          </h3>
          <h3 className="text-center text-gray-500 text-sm pt-2">
            La página que buscas no se ha encontrado
          </h3>

          <div className="flex justify-center mt-4">
            <Link
              href="/"
              className="text-white bg-secondary hover:bg-secondary/80 px-8 py-2 rounded-md text-sm
            "
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
