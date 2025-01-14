/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/globals.css";
import "../styles/custom.css";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { usePortalStore } from "../store/portal";
import shallow from "zustand/shallow";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getProfile } from "apis/auth";
import ReactGA from "react-ga4";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [loading, setLoading] = useState(true);
  const { setProfile, setURLParams, setDataProfile } = usePortalStore(
    (state) => ({
      setProfile: state.setProfile,
      setURLParams: state.setURLParams,
      setDataProfile: state.setDataProfile,
    }),
    shallow
  );

  const router = useRouter();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    var urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
    const type = urlParams.get("type");

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "production") {
      ReactGA.initialize("G-YBE56Z9XKX");
    }

    if (type === "recovery" || type === "signup") {
      setURLParams(urlParams.toString());
      router.push("/nuevo-password");
    }

    const userToken = window.localStorage.getItem("@UserToken");

    if (userToken) {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/auth/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (resp.status === 401) {
        console.log("No hay token");
      } else {
        const res = await resp.json();

        if (userToken) {
          setProfile({
            AuthId: res.user.AuthId,
            name: res.user.name,
            email: res.user.emailaddress,
            isActive: res.user.isactive,
            groups: res.groups,
            token: userToken,
            id: res.user.id,
            roleId: res.user.roleId,
            role_name: res.user.role_name,
          });

          window.localStorage.setItem("@UserToken", String(userToken));
          Cookies.set("token", String(userToken), { expires: 7 });

          const infoClient = await getProfile(res.user.id, userToken);
          setDataProfile(infoClient);
        }
      }
    }

    setLoading(false);
  };

  if (loading) return null;

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={inter.className}>
          <Component {...pageProps} />
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}
