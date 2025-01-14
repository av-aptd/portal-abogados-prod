import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  formatDate,
  formatTime,
  getSettingsSecure,
  getSettingsSecureDocument,
} from "shared/helpers";

import es from "date-fns/locale/es";
import { usePortalStore } from "store/portal";
import CSVUploader from "../csvUploader";
import { Check } from "components/icons";
import { useRouter } from "next/router";
import SectionBloc from "components/layouts/components/section/sectionBloc";
import { huelga } from "vars/mailings";

const PlantillaManual = () => {
  const profile = usePortalStore((state) => state.profile);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [created, setCreated] = useState<boolean>(false);

  const templates = [
    {
      name: "Recordatorio 2a cuota",
      value: "recordatorio-2a-quota",
    },
    {
      name: "Cambio teléfono",
      value: "cambio-numero",
    },
    {
      name: "Administrador concursal",
      value: "administrador-concursal",
    },
    {
      name: "Promoción genérica",
      value: "promocion-generica",
    },
    {
      name: "Portal Caido",
      value: "portal-caido",
    },
    {
      name: "Promo exclusiva",
      value: "promo-exclusiva",
    },
  ];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    let messages = [];
    let counter = 1;

    console.log(users);

    const usuarios = [
      "alex@wualia.com",
      "alex.verdaguer@abogadosparatusdeudas.es",
    ];

    for (const lead of huelga) {
      //   const colName = String(
      //     Object.keys(lead).find((key) => key.toLowerCase().includes("mail"))
      //   );
      //   console.log(lead[colName]);

      messages.push({
        source: "Mailing",
        From: "noreply@abogadosparatusdeudas.es",
        To: lead,
        TemplateAlias: "huelga-finalizada",
        templateModel: {
          subject: "Huelga finalizada",
          message: "",
        },
        messageStream: "outbound",
      });

      if (counter == 50) {
        const options = getSettingsSecure(
          "POST",
          profile.token,
          JSON.stringify(messages)
        );

        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
          options
        );

        messages = [];
        counter = 0;
      }
      counter++;
    }

    if (messages.length > 0) {
      const options = getSettingsSecure(
        "POST",
        profile.token,
        JSON.stringify(messages)
      );

      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
        options
      );
    }
    setCreated(true);
  };

  return (
    <div className="pt-6 mx-auto max-w-3xl">
      <SectionBloc title="Plantilla predefinida" description="">
        {created ? (
          <div className="bg-white flex justify-center items-center p-4 rounded-lg border max-w-3xl mt-4">
            <div>
              <div className="flex justify-center pb-4">
                <Check className="h-12 w-12 text-green-400" />
              </div>
              <h1>Mailing enviado correctamente</h1>
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("/portal/aptd/mailing")}
                  className="bg-secondary px-6 py-1 text-white rounded mt-4 text-sm"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col space-y-6"
            >
              <div>
                <label
                  htmlFor="template"
                  className="block text-sm font-medium text-gray-700"
                >
                  Seleccionar template
                </label>
                <select
                  {...register("template", { required: true })}
                  id="template"
                  name="template"
                  className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                >
                  <option>Selecciona un template</option>
                  {templates.map((template) => (
                    <option key={template.value} value={template.value}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Asunto
                </label>
                <div className="mt-1">
                  <input
                    {...register("subject", { required: true })}
                    type="text"
                    name="subject"
                    id="subject"
                    className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <CSVUploader setUsers={setUsers} />
                <div className="flex justify-center pt-4 text-sm">
                  {users.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Check className="inline-block w-5 h-5 text-green-500" />
                      <p className="text-gray-500">
                        {users.length} usuarios cargados correctamente.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                Enviar mailing
              </button>
            </form>
          </div>
        )}
      </SectionBloc>
    </div>
  );
};

export default PlantillaManual;
