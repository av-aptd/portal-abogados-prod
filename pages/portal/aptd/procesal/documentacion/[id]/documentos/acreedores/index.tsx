import React, { useEffect, useState, useCallback } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../../../_app";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";

import { utils, writeFileXLSX, writeXLSX } from "xlsx";

import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";

import { useQuery } from "@tanstack/react-query";
import { getUserCreditors } from "apis/client";
import LoadingContainer from "components/portal/loading";
import { getDocumentsType, uploadGeneratedDocument } from "apis/docs";
import { processesByUserId, setStatusDocument } from "apis/processes";
import { readFile } from "fs";
import { getDebTypes } from "apis/creditors";

const Acreedores: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  const [totalAmount, setTotalAmount] = useState(0);

  const router = useRouter();
  const client = usePortalStore((state) => state.client);

  const userCreditors = useQuery(
    ["userCreditors", profile.token, client.id],
    () => getUserCreditors(profile.token, client.id),
    {
      onSuccess(data) {
        setTotalAmount(
          data.reduce((a: any, b: any) => a + Number(b.contractAmount), 0)
        );
      },
    }
  );

  const { data: debtTypes } = useQuery({
    queryKey: ["debtTypes"],
    queryFn: getDebTypes,
  });

  const getNameDebtType = (value: string) => {
    const debtType = debtTypes?.find((debt: any) => debt.value === value);
    return debtType?.name;
  };

  const getFormattedData = () => {
    let formattedData: any[] = [];

    userCreditors.data.forEach((creditor: any) => {
      formattedData.push({
        creditor: creditor.creditorName,
        client: client.name + " " + client.surname,
        address: creditor.creditorLocation,
        email: creditor.creditorEmail,
        phone: creditor.creditorPhoneNumber,
        debt: creditor.contractAmount + "€",
        expirationDate: creditor.expirationDate,
        typeOfDebt: getNameDebtType(creditor.typeOfDebt),
        observations: `${creditor.debtStatus}, ${creditor.stage} ${
          creditor.procedureNumber != null ? `,${creditor.procedureNumber}` : ""
        } ${creditor.courtName != null ? `,${creditor.courtName}` : ""}
        `,
      });
    });

    formattedData.push({
      creditor: "TOTAL",
      client: "",
      address: "",
      email: "",
      phone: "",
      debt: totalAmount.toString() + "€",
      expirationDate: "",
      typeOfDebt: "",
      observations: "",
    });

    return formattedData;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const finalData = getFormattedData();
    const worksheet = utils.json_to_sheet(finalData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Dates");

    utils.sheet_add_aoa(
      worksheet,
      [
        [
          "ACREEDOR",
          "DEUDOR",
          "DIRECCIÓN",
          "MAIL",
          "TELÉFONO",
          "DEUDA TOTAL PENDIENTE",
          "VENCIMIENTO",
          "TIPO DE DEUDA",
          "OBSERVACIONES",
        ],
      ],
      { origin: "A1" }
    );

    writeFileXLSX(workbook, "listado-acreedores.xlsx", {
      compression: true,
    });

    const b = writeXLSX(workbook, {
      type: "buffer",
      compression: true,
      bookType: "xlsx",
    });

    const docTypes = await getDocumentsType(profile.token);
    const docTypeId = docTypes.find((d: any) => d.code == "LDA")?.id;
    const processes = await processesByUserId(profile.token, client.id);
    const processId = processes[0].id;
    const blob = new Blob([b], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const formData = new FormData();
    formData.append("file", blob, "listado-acreedores.xlsx");
    formData.append("fileName", "listado-acreedores.xlsx");
    formData.append("fileTypeId", docTypeId);
    formData.append("processId", processes[0].id);
    formData.append("clientId", client.id);

    const doc = await uploadGeneratedDocument(
      profile.token,
      processId,
      formData
    );
    await setStatusDocument(
      profile.token,
      processId,
      doc.id,
      JSON.stringify({ status: 1 })
    );
  };
  return (
    <div className="p-4 mx-auto max-w-7xl">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 divide-y divide-gray-200 bg-white p-4 rounded-lg border"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Listado de acreedores
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Confirma los siguientes campos para generar el listado de
                acreedores del cliente.
              </p>
            </div>
          </div>
        </div>

        <div className="h-4" />

        <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-gray-300 px-2">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                >
                  Acreedor
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Tipo deuda
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-6 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Importe
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                >
                  Etapa
                </th>
              </tr>
            </thead>
            <tbody>
              {userCreditors.isLoading ? (
                <LoadingContainer />
              ) : (
                <>
                  {userCreditors.data.map((creditor: any, index: any) => (
                    <tr key={creditor.id} className="">
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-2">
                        {creditor.creditorName}
                      </td>
                      <td className="py-4 px-3 text-sm">
                        {getNameDebtType(creditor.typeOfDebt)}
                      </td>
                      <td className="hidden py-4 px-6 text-right text-sm text-gray-500 sm:table-cell">
                        {Number(creditor.contractAmount).toLocaleString(
                          "es-AR"
                        )}{" "}
                        €
                      </td>
                      <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
                        {creditor.debtStatus}
                      </td>
                      <td className="py-4 pl-3 pr-4 text-left text-sm text-gray-500 sm:pr-6 md:pr-0">
                        {creditor.stage}
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                ></th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-6 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  {totalAmount.toLocaleString("es-AR")}€
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                ></th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                ></th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Volver
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            >
              Generar listado
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Acreedores;

Acreedores.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
