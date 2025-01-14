import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  formatDate,
  formatTime,
  getSettingsSecure,
  getSettingsSecureDocument,
} from "shared/helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
import { usePortalStore } from "store/portal";
import CSVUploader from "../csvUploader";
import { Check } from "components/icons";
import { useRouter } from "next/router";

const WebinarTemplate = () => {
  const profile = usePortalStore((state) => state.profile);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [created, setCreated] = useState<boolean>(false);

  const uploadImage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);
    const url = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/upload-file`,
      getSettingsSecureDocument("POST", profile.token, formData)
    );
    const response = await url.json();
    setImageUrl(response.url);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const body = {
      name: data.subject,
      description: "",
      presenterName: data.presenterName,
      presenterRole: data.presenterRole,
      date: data.webinarDate,
      isActive: 1,
      url: data.webinarUrl,
      image: imageUrl,
    };

    const options = getSettingsSecure(
      "POST",
      profile.token,
      JSON.stringify(body)
    );

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/webinars`,
      options
    );

    const webinarId = (await response.json()).id;

    const webinar = ["alex@wualia.com, roman@wualia.com"];

    let messages = [];
    let counter = 1;

    console.log(users);

    for (const lead of users) {
      const colName = String(
        Object.keys(lead).find((key) => key.toLowerCase().includes("mail"))
      );
      console.log(lead[colName]);

      messages.push({
        source: "Mailing",
        From: "noreply@abogadosparatusdeudas.es",
        To: lead[colName],
        TemplateAlias: "webinar-template",
        templateModel: {
          subject: data.subject,
          message: "",
          customProperties: [
            {
              name: "preview",
              value: data.preview,
            },
            {
              name: "presenterName",
              value: data.presenterName,
            },
            {
              name: "presenterRole",
              value: data.presenterRole,
            },
            {
              name: "webinarDate",
              value: formatDate(data.webinarDate, "noYear", "es"),
            },
            {
              name: "webinarTime",
              value: formatTime(data.webinarDate, "es"),
            },
            {
              name: "webinarUrl",
              value: data.webinarUrl,
            },
            {
              name: "imageUrl",
              value: imageUrl,
            },
            {
              name: "webinarId",
              value: webinarId,
            },
          ],
        },
        messageStream: "outbound",
      });

      if (counter == 50) {
        const options = getSettingsSecure(
          "POST",
          profile.token,
          JSON.stringify(messages)
        );

        const response = await fetch(
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/notifications/email-notification/bulk`,
        options
      );
    }
    setCreated(true);
  };

  return (
    <>
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
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-6"
          >
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
            <div className="">
              <label
                htmlFor="preview"
                className="block text-sm font-medium text-gray-700"
              >
                Preview
              </label>
              <div className="mt-1">
                <input
                  {...register("preview", { required: true })}
                  type="text"
                  name="preview"
                  id="preview"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div className="mt-2 mb-4">
              <label
                htmlFor="preview"
                className="block text-sm font-medium text-gray-700 pb-1"
              >
                Imagen
              </label>
              {imageUrl != "" ? (
                <img src={imageUrl} className="rounded-lg shadow" />
              ) : (
                <div className="bg-white flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="imageFile"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-secondary focus-within:outline-none hover:text-blue-600"
                      >
                        <span>Subir documento</span>
                        <input
                          id="imageFile"
                          name="imageFile"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={uploadImage}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="">
              <label
                htmlFor="presenterName"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre Presentador
              </label>
              <div className="mt-1">
                <input
                  {...register("presenterName", { required: true })}
                  type="text"
                  name="presenterName"
                  id="presenterName"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="presenterRole"
                className="block text-sm font-medium text-gray-700"
              >
                Cargo Presentador
              </label>
              <div className="mt-1">
                <input
                  {...register("presenterRole", { required: true })}
                  type="text"
                  name="presenterRole"
                  id="presenterRole"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="webinarDate"
                className="block text-sm font-medium text-gray-900"
              >
                Día y hora del webinar
              </label>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="webinarDate"
                  render={({ field }) => (
                    <DatePicker
                      showTimeSelect
                      locale="es"
                      placeholderText="Seleccionar fecha"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                    />
                  )}
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="webinarUrl"
                className="block text-sm font-medium text-gray-700"
              >
                URL del webinar
              </label>
              <div className="mt-1">
                <input
                  {...register("webinarUrl", { required: true })}
                  type="text"
                  name="webinarUrl"
                  id="webinarUrl"
                  className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
            >
              Enviar mailing de webinar
            </button>
          </form>
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
        </div>
      )}
    </>
  );
};

export default WebinarTemplate;
