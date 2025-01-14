import React, { useEffect, useState } from "react";
import ClientNavBar from "./components/navbars/client";
import { useRouter } from "next/router";
import { getUserById } from "apis/users";
import { useQuery } from "@tanstack/react-query";
import { usePortalStore } from "store/portal";

const ClientLayout = ({ children }: any) => {
  const router = useRouter();
  const profile = usePortalStore((state) => state.profile);
  const [usuario, setUsuario] = useState<any>({});
  const { setClient } = usePortalStore((state) => state);

  useEffect(() => {
    getUsuario();
  }, []);

  const getUsuario = async () => {
    const response = await getUserById(profile.token, router.query.id);
    setUsuario(response);
    setClient(response);
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 lg:items-start">
      <div className="sticky top-20">
        <ClientNavBar />
      </div>

      <div className="flex-1 bg-white rounded-lg border">
        <div className="px-4 pt-2">
          <h3 className="text-sm text-gray-700">
            {usuario?.name} {usuario?.surname}
          </h3>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ClientLayout;
