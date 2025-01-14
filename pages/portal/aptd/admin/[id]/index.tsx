import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../_app";
import React, { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "components/portal/breadCrumbs";
import { formatDate } from "shared/helpers";

import { usePortalStore } from "store/portal";

import { useQuery } from "@tanstack/react-query";
import MessageClient from "components/portal/messageClient";

interface User {
  id: number;
  name: string;
  surname: string;
  phonenumber: string;
  dni: string;
}

interface Process {
  id: number;
  processname: string;
  contractprice: number;
  installmentcount: number;
}

interface Installment {
  id: number;
  price: number;
  planneddate: Date;
  status: number;
  paymentid: number;
}

const UserDetail: NextPageWithLayout = ({
  user,
  processes,
  installments,
}: any) => {
  const router = useRouter();

  const profile = usePortalStore((state) => state.profile);

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${profile.token}`,
    },
  };

  // const { data: user } = useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: async () => {
  //     const resp = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${router.query.id}`,
  //       options
  //     );
  //     return await resp.json();
  //   },
  //   initialData: userData,
  // });

  // const { data: processes } = useQuery({
  //   queryKey: ["userProcesses"],
  //   queryFn: async () => {
  //     const resp = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER}/api/processes?userId=${router.query.id}`,
  //       options
  //     );
  //     return await resp.json();
  //   },
  //   initialData: processData,
  // });

  // const { data: installments } = useQuery({
  //   queryKey: ["userInstallments"],
  //   queryFn: async () => {
  //     const resp = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${processData[0].id}/installments`,
  //       options
  //     );
  //     return await resp.json();
  //   },
  //   initialData: installmentsData,
  // });

  return (
    <>
      {/* <Breadcrumbs route={route} /> */}
      <div className="pt-14  mx-auto max-w-7xl">
        <h1 className="font-bold text-2xl mb-6 text-primary">
          Detalle cliente
        </h1>
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="grid gap-8">
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-3 sm:px-6 bg-gray-50">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Información cliente
                </h3>
              </div>
              <div className="p-4">
                <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                  <p className="text-gray-500 text-sm"> Nombre</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {user?.name}
                  </p>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                  <p className="text-gray-500 text-sm">Apellidos</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {user?.surname}
                  </p>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                  <p className="text-gray-500 text-sm">Teléfono</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {user?.phonenumber}
                  </p>
                </div>
                <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {user?.emailaddress}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500 text-sm">DNI</p>
                  <p className="text-gray-800 font-medium text-sm">
                    {user?.dni}
                  </p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-3 sm:px-6 bg-gray-50">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Expedientes
                </h3>
              </div>
              <div className="p-4">
                {processes?.map((process: any) => (
                  <div className="text-gray-500" key={process.id}>
                    <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                      <p className="text-gray-500 text-sm">Nombre</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {process.processname}
                      </p>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                      <p className="text-gray-500 text-sm">Plan contratado</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {process.contractprice.toLocaleString(router.locale)}€
                      </p>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                      <p className="text-gray-500 text-sm">Número de pagos</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {process.installmentcount}
                      </p>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-gray-100 mb-2">
                      <p className="text-gray-500 text-sm">Precio cuota</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {process.contractprice === 3343
                          ? "499€ + (79€ x 36)"
                          : ""}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-gray-500 text-sm">antidad restante</p>
                      <p className="text-gray-800 font-medium text-sm">
                        {process.remainingamount.toLocaleString(router.locale)}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-3 sm:px-6 bg-gray-50">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Mensaje a cliente
              </h3>
            </div>
            <div className="p-4">
              <MessageClient user={user} token={profile.token} owner="APTD" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserDetail.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default UserDetail;

export async function getServerSideProps(context: any) {
  let token = context.req.cookies.token;

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/org/users/${context.query.id}`,
    options
  );

  const data = await resp.json();

  const resp2 = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes?userId=${context.query.id}`,
    options
  );
  const data2 = await resp2.json();

  const resp3 = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/processes/${data2[0].id}/installments`,
    options
  );
  const data3 = await resp3.json();

  return {
    props: { user: data, processes: data2, installments: data3 },
  };
}
