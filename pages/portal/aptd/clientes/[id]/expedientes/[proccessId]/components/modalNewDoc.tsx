import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { addRequiredDocument, getDocumentsType } from "apis/docs";
import clsx from "clsx";
import { CheckFilled } from "components/icons";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { usePortalStore } from "store/portal";
import { useUIStore } from "store/ui";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import {
  sendEmailNotification,
  sendPushNotification,
} from "apis/notifications";
import { getUserById } from "apis/users";

const ModalNewDoc = ({ docToAdd, setDocToadd }: any) => {
  const profile = usePortalStore((state) => state.profile);
  const showModalExtended = useUIStore((state) => state.showModalExtended);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [doc, setDoc] = useState<any>("");
  const [content, setContent] = useState<any>("");

  const docsTypeQuery = useQuery(["docsType"], async () =>
    getDocumentsType(profile.token)
  );

  const { data: user } = useQuery(["userById", router.query.id], async () =>
    getUserById(profile.token, router.query.id)
  );

  const closeModal = () => {
    setDocToadd(null);
    showModalExtended();
  };

  const docMutation = useMutation(
    ["addDocument"],
    () => addRequiredDocument(profile.token, router.query.proccessId, docToAdd),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["docsUser", router.query.proccessId],
        });
        queryClient.invalidateQueries({
          queryKey: ["userTotalDocs", router.query.id],
        });

        showModalExtended();
        setDocToadd(null);
        sendAllNotifications();
      },
    }
  );

  const sendAllNotifications = async () => {
    const data = {
      title: "Nuevo documento requerido",
      body: "Se requiere un documento nuevo",
      subtitle: "Se requiere un documento nuevo",
      data: {
        url: "/(app)/notificaciones/{notification_id}",
        content: content,
      },
    };

    const owner = profile.name;

    await sendPushNotification(user?.id, data);
    await sendEmailNotification(user, owner, {
      title: "Nuevo documento requerido",
      content: content,
    });

    return true;
  };

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = ["bold", "italic", "list", "bullet", "link"];

  const anadirDoc = async () => {
    if (docToAdd) {
      docMutation.mutate();
    }
  };

  return (
    <>
      <div className="border-b py-4 px-8">
        <h3 className="font-semibold text-gray-700">
          Seleccionar documento nuevo
        </h3>
      </div>
      <div className="px-4 py-2 bg-gray-50">
        <input
          type="text"
          value={doc}
          onChange={(e) => setDoc(e.target.value)}
          className="block w-full rounded-lg py-1.5 border-gray-300 text-gray-700 focus:border-secondary focus:outline-none focus:ring-secondary placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="Buscar documentos"
        />
      </div>

      <div className=" overflow-y-scroll h-[200px]">
        {docsTypeQuery?.data
          ?.filter((item: any) =>
            item.name.toLowerCase().includes(doc.toLowerCase())
          )
          .map((doc: any) => (
            <div
              key={doc.id}
              className={clsx(
                "border-b last-of-type:border-none px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-50 duration-200"
              )}
              onClick={() => setDocToadd(doc.id)}
            >
              <p
                className={clsx(
                  doc.id == docToAdd ? "text-secondary" : "text-gray-700",
                  "text-sm"
                )}
              >
                {doc.name}
              </p>
              <div className="w-6 flex justify-end">
                {doc.id == docToAdd && (
                  <CheckFilled className="w-4 h-4 text-secondary" />
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="border-t">
        <div className="px-8 py-4">
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            theme="snow"
            className="min-h-[150px]"
          />
        </div>
      </div>

      <div className="border-t flex justify-end space-x-4 p-4">
        <button
          type="button"
          className="bg-white text-gray-700 text-sm px-4 py-2 border rounded-md hover:bg-gray-50 duration-200 focus:outline-none"
          onClick={() => closeModal()}
        >
          Cerrar
        </button>

        <button
          type="button"
          disabled={docMutation.isLoading}
          onClick={() => anadirDoc()}
          className="inline-flex items-center w-56 justify-center rounded-md border border-transparent bg-secondary px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none"
        >
          {docMutation.isLoading ? (
            <Ring size={16} color="#fff" />
          ) : (
            "Añadir documento"
          )}
        </button>
      </div>
    </>
  );
};

export default ModalNewDoc;
