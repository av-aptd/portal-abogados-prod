import React, { useEffect, useState } from "react";
import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../../../../../_app";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { QUESTIONS_GROUP_KEY } from "enums/questionClientGroupKey.enum";
import { getQuestionClient, QUESTION_OPERATORS } from "shared/helpers";
import { usePortalStore } from "store/portal";
import { useRouter } from "next/router";
import TrabajadoresRendered from "components/portal/docs/trabajadores/trabajadores.rendered";
import { getPropertyValueMap } from "shared/helpers";
import { getDocumentsType, uploadGeneratedDocument } from "apis/docs";
import { processesByUserId, setStatusDocument } from "apis/processes";

const Trabajadores: NextPageWithLayout = () => {
  const profile = usePortalStore((state) => state.profile);
  let listadoTrabajadores: any[] = [];
  let trabajadores: any[] = [];
  const router = useRouter();
  const client = usePortalStore((state) => state.client);
  const clientInfo = usePortalStore((state) => state.clientInfo);

  if (
    getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.TIENES_TRABAJADORES,
      QUESTION_OPERATORS.STARTS_WITH
    )[0] != undefined
  ) {
    listadoTrabajadores = getQuestionClient(
      clientInfo,
      QUESTIONS_GROUP_KEY.PLANTILLA_TRABAJADORES,
      QUESTION_OPERATORS.STARTS_WITH
    );

    listadoTrabajadores.forEach((item: any) => {
      trabajadores.push(item.properties);
    });
  }

  const clientData: any = {
    dni: client.dni,
    trabajadores,
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const blob = await TrabajadoresRendered(client, clientData);
    saveAs(blob, `listado-trabajadores.pdf`);

    const docTypes = await getDocumentsType(profile.token);
    const docTypeId = docTypes?.find((d: any) => d.code == "LDT").id;
    const processes = await processesByUserId(profile.token, client.id);
    const processId = processes[0].id;

    const formData = new FormData();
    formData.append("file", blob, "listado_trabajadores");
    formData.append("fileName", "listado-trabajadores.pdf");
    formData.append("fileTypeId", docTypeId);
    formData.append("processId", processId);
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
                Listado de trabajadores
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Confirma los siguientes campos para generar el listado de
                trabajadores del cliente.
              </p>
            </div>
          </div>
        </div>

        <div className="h-4" />

        <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-2"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Apellido
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Teléfono
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-2"
                >
                  Salario
                </th>
              </tr>
            </thead>
            <tbody>
              {trabajadores.map((cuenta: any, index: any) => (
                <tr key={cuenta.id} className="">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-2">
                    {
                      cuenta.find((p: any) => p.propertyKey == "name")
                        .propertyValue
                    }
                  </td>
                  <td className="py-4 px-3 text-sm">
                    {
                      cuenta.find((p: any) => p.propertyKey == "surname")
                        .propertyValue
                    }
                  </td>
                  <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
                    {
                      cuenta.find((p: any) => p.propertyKey == "email")
                        .propertyValue
                    }
                  </td>
                  <td className="hidden py-4 px-3 text-left text-sm text-gray-500 sm:table-cell">
                    {
                      cuenta.find((p: any) => p.propertyKey == "phone")
                        .propertyValue
                    }
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-2">
                    {Number(
                      cuenta.find((p: any) => p.propertyKey == "salary")
                        .propertyValue
                    ).toLocaleString("es-AR")}{" "}
                    €
                  </td>
                </tr>
              ))}
            </tbody>
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

export default Trabajadores;

Trabajadores.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};
