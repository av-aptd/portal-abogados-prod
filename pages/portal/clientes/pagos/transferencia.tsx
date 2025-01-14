import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { saveAs } from "file-saver";
import { Page, Text, View, Document, Image, pdf } from "@react-pdf/renderer";
import createTw from "react-pdf-tailwind";
import { usePortalStore } from "store/portal";
import { ClockWait } from "components/icons";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getProcessInfo } from "apis/processes";
import { getUserProcesses } from "apis/client";

const PagoTransferencia: NextPageWithLayout = () => {
  const [hasInfo, setHasInfo] = useState<boolean>(false);
  const [info, setInfo] = useState<any>({});
  const dataProfile = usePortalStore((state) => state.dataProfile);
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const processesQuery = useQuery(["procceses"], () =>
    getUserProcesses(profile.token, profile.id)
  );

  const PaymentQuery = useQuery(
    ["paymentInfo"],
    () => getProcessInfo(profile.token, processesQuery.data[0].id),
    { enabled: !!processesQuery.data }
  );

  const tw = createTw({
    theme: {
      fontFamily: {
        sans: ["Inter"],
      },
      extend: {
        colors: {
          custom: "#bada55",
        },
      },
    },
  });

  // const schema = z.object({
  //   amount: z
  //     .number()
  //     .gte(79, { message: "El importe mínimo ha de ser de 79€" })
  //     .or(
  //       z.number().lte(PaymentQuery?.data?.total_pending, {
  //         message: "El importe supera la deuda pendiente",
  //       })
  //     ),
  // });

  const schema = z.object({
    amount: z.number().lte(PaymentQuery?.data?.total_pending, {
      message: `El importe no puede superar la deuda pendiente, deuda actual: ${PaymentQuery?.data?.total_pending}€ `,
    }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setInfo({
      bankName: "Banco Santander",
      bankAccount: "ES83 0049 4704 1120 1613 4058",
      amount: data.amount,
    });
    setHasInfo(true);
  };

  const descargarHoja = async () => {
    const blob = await pdf(
      <Document>
        <Page
          size="A4"
          style={tw(
            "px-16 py-8 leading-7 text-[12px] text-gray-500 text-justify"
          )}
        >
          <View style={tw("flex justify-start")}>
            <Image
              src="./../../../../Logo-aptd.png"
              style={tw("h-14 w-40 object-contain")}
            />
          </View>

          <Text
            style={tw(
              "font-semibold text-[14px] leading-5 text-gray-800 text-center pb-12 pt-6"
            )}
          >
            TRANSFERENCIA BANCARIA
          </Text>
          <Text style={tw("font-bold text-gray-800 text-[14px]")}>Banco</Text>
          <Text style={tw("pb-6")}>{info.bankName}</Text>
          <Text style={tw("font-bold text-gray-800 text-[14px]")}>
            Cuenta bancaria
          </Text>
          <Text style={tw("pb-6")}>{info.bankAccount}</Text>
          <Text style={tw("font-bold text-gray-800 text-[14px]")}>
            Beneficiario
          </Text>
          <Text style={tw("pb-6")}>CORMEUM GLOBAL SL</Text>
          <Text style={tw("font-bold text-gray-800 text-[14px]")}>
            Concepto
          </Text>
          <Text style={tw("pb-6")}>
            {dataProfile.dni} - {dataProfile.name} {dataProfile.surname}
          </Text>
          <Text style={tw("font-bold text-gray-800 text-[14px]")}>Importe</Text>
          <Text style={tw("pb-6")}>{info.amount}€</Text>
        </Page>
      </Document>
    ).toBlob();

    saveAs(blob, `documento-transferencia-bancaria.pdf`);
  };

  return (
    <div className="pt-6 mx-auto max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="">
          <SectionBloc title="Transferencia bancaria">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Importe a ingresar
                </label>

                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    {...register("amount", { valueAsNumber: true })}
                    type="number"
                    name="amount"
                    id="amount"
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-secondary focus:ring-secondary sm:text-sm"
                    placeholder="0.00"
                    aria-describedby="price-currency"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="price-currency"
                    >
                      €
                    </span>
                  </div>
                </div>
                {errors.amount && (
                  <p className="text-red-400 text-sm pt-1 pl-2">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <div className="flex space-x-4 py-4 mt-16">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center rounded-md border bg-white px-8 py-3 text-sm font-medium leading-4 text-gray-500 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                >
                  Guardar Información
                </button>
              </div>
            </form>
          </SectionBloc>
        </div>

        <SectionBloc title="Previsualización">
          {hasInfo ? (
            <>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500 text-sm">Banco</p>
                <p className="text-gray-700 text-sm font-bold">
                  {info.bankName}
                </p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500 text-sm">Cuenta bancaria</p>
                <p className="text-gray-700 text-sm font-bold">
                  {info.bankAccount}
                </p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500 text-sm">Beneficiario</p>
                <p className="text-gray-700 text-sm font-bold">
                  CORMEUM GLOBAL SL
                </p>
              </div>
              <div className="flex justify-between items-center pb-4">
                <p className="text-gray-500 text-sm">Concepto</p>
                <p className="text-gray-700 text-sm font-bold">
                  {dataProfile.dni} - {dataProfile.name} {dataProfile.surname}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Importe</p>
                <p className="text-gray-700 text-sm font-bold">
                  {info.amount}€
                </p>
              </div>
              <button
                onClick={descargarHoja}
                className="mt-8 inline-flex w-full justify-center items-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
              >
                Descargar hoja para el banco
              </button>
            </>
          ) : (
            <div className="px-4 py-8 bg-gray-50 rounded-lg">
              <ClockWait className="mx-auto h-10 w-10 text-gray-400" />
              <div className="text-center pt-4 text-sm text-gray-500">
                Esperando información guardada
              </div>
            </div>
          )}
        </SectionBloc>
      </div>
    </div>
  );
};

PagoTransferencia.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default PagoTransferencia;
