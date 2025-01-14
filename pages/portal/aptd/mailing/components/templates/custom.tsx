import React, { useState } from "react";
import Head from "next/head";
import { ModalExtended } from "components/portal/estudio/modalExtended";
import Builder from "../../components/builder";
import { Add, Check } from "components/icons";
import { useUIStore } from "store/ui";
import ButtonBloc from "../../components/buttonBloc";
import ImageBloc from "../../components/imageBloc";
import TextBloc from "../../components/textBloc";
import { getSettingsSecure } from "shared/helpers";
import { usePortalStore } from "store/portal";
import CSVUploader from "../csvUploader";
import { useRouter } from "next/router";

// import { casosExito } from "vars/mailings";

const CustomTemplate = () => {
  const showModalExtended: any = useUIStore((state) => state.showModalExtended);
  const [components, setComponents] = useState<any[]>([]);
  const [currentComponent, setCurrentComponent] = useState<any>(null);
  const [preview, setPreview] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [created, setCreated] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const profile = usePortalStore((state) => state.profile);
  const router = useRouter();

  const showComponent = (component: any) => {
    setCurrentComponent(component);

    showModalExtended();
  };

  const deleteComponent = (component: any) => {
    setComponents(components.filter((c: any) => c !== component));
  };

  const showBuilder = () => {
    showModalExtended();
  };

  let html = "";

  const webinar2 = [
    "alex@wualia.com",
    // "roman@wualia.com",
    // "roman@abogadosparatusdeudas.es",
  ];

  const sendMailing = async () => {
    composeHtml();

    console.log("html", html);

    let messages = [];

    let counter = 1;

    for (const lead of users) {
      const colName = String(
        Object.keys(lead).find((key) => key.toLowerCase().includes("mail"))
      );

      messages.push({
        source: "Mailing",
        From: "nulidades@abogadosparatusdeudas.es",
        To: lead[colName],
        TemplateAlias: "custom-template",
        templateModel: {
          subject: subject,
          preview: preview,
          message: html,
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

      console.log(response);
    }
    setCreated(true);
  };

  const composeHtml = () => {
    html = "";
    components.forEach((component: any) => {
      switch (component.componentType) {
        case "button":
          html += `<div role="separator" style="line-height: 24px">&zwnj;</div>
        <a href=${component.url} class="sm-block hover-bg-primary-700" style="text-decoration: none; display: inline-block; border-radius: 4px; background-color: #1BA7DF; padding: 16px 40px; text-align: center; font-size: 16px; font-weight: 700; line-height: 100%; color: #fff">
          <!--[if mso]><i style="letter-spacing: 40px; mso-font-width: -100%; mso-text-raise:30px;">&#8202;</i><![endif]-->
          <span style="mso-text-raise: 16px">${component.label}</span>
          <!--[if mso]><i style="letter-spacing: 40px; mso-font-width: -100%;">&#8202;</i><![endif]-->
        </a>`;
          break;
        case "text":
          html += `<div role="separator" style="line-height: 24px">&zwnj;</div>
          <p style="margin: 0; line-height: 24px">
            ${component.text}
            </p>`;
          break;
        case "image":
          html += `<div role="separator" style="line-height: 24px">&zwnj;</div>
          <a href=${component.imageLink}>
            <picture>
              <source srcset=${component.imageUrl} media="(prefers-color-scheme: dark)">
              <img src=${component.imageUrl} width="600" alt=${component.imageAlt} style="border: 0; max-width: 100%; vertical-align: middle; line-height: 100%">
            </picture>
          </a>`;
          break;
      }
    });
  };

  return (
    <>
      <Head>
        <title>Nuevo mailing</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
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
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 pt-6">
          <div>
            <h1 className="font-bold text-2xl mb-2 text-primary pb-4">
              Nuevo mailing
            </h1>

            <div className="pb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                Título
              </label>
              <div className="mt-1">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>
            <div className="pb-4">
              <label
                htmlFor="preview"
                className="block text-sm font-medium text-gray-700"
              >
                Preview
              </label>
              <div className="mt-1">
                <input
                  id="preview"
                  name="preview"
                  type="text"
                  value={preview}
                  onChange={(e) => setPreview(e.target.value)}
                  className="block border-gray-300 w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>
            <div>
              {components.map((component, index) => (
                <div
                  key={index}
                  className="mb-4 bg-white p-4 border rounded-lg"
                >
                  {component.componentType == "button" && (
                    <div className="inline-flex px-8 bg-secondary text-white uppercase rounded-lg text-sm text-center py-3">
                      {component.label}
                    </div>
                  )}
                  {component.componentType == "text" && <p>{component.text}</p>}
                  {component.componentType == "image" && (
                    <>
                      <img
                        src={component.imageUrl}
                        className="rounded-lg shadow"
                      />
                    </>
                  )}
                </div>
              ))}

              {currentComponent == "bloque-texto" && (
                <TextBloc
                  setComponents={setComponents}
                  setCurrentComponent={setCurrentComponent}
                />
              )}
              {currentComponent == "imagen" && (
                <ImageBloc
                  setComponents={setComponents}
                  setCurrentComponent={setCurrentComponent}
                />
              )}
              {currentComponent == "boton" && (
                <ButtonBloc
                  setComponents={setComponents}
                  setCurrentComponent={setCurrentComponent}
                />
              )}

              <div className="flex justify-center p-2 rounded-lg mt-4">
                <button
                  onClick={showBuilder}
                  className="flex justify-center items-center"
                >
                  <Add className="h-6 w-6 text-gray-500" />
                  <p className="pl-2 text-gray-500 text-sm"></p>
                </button>
              </div>
            </div>

            <button
              onClick={sendMailing}
              className="mt-8 flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
            >
              Enviar mailing
            </button>
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
        </div>
      )}
      <ModalExtended>
        <Builder showComponent={showComponent} />
      </ModalExtended>
    </>
  );
};

export default CustomTemplate;
