import type { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";
import LoginLayout from "components/layouts/login";

import Head from "next/head";
import Link from "next/link";
import { ArrowBack } from "components/icons";
import NewPasswordForm from "components/formNewPassword";
import Image from "next/image";

const PasswordForgot: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Pedir cambio contraseña</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <div className="relative h-14 w-auto">
                <Image
                  className="object-contain"
                  src="/favicon.png"
                  alt="Anagrama de abogados para tus deudas"
                  fill
                />
              </div>

              <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 text-center ">
                Acceso al portal
              </h2>
              <p className="text-lg text-gray-400 text-center ">
                de abogados para tus deudas
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <NewPasswordForm />
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            className="absolute inset-0 h-full w-full object-cover"
            src="/change-password.webp"
            alt=""
            fill
          />
        </div>
      </div>
    </>
  );
};

PasswordForgot.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export default PasswordForgot;
