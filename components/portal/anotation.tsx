import React, { useState } from "react";
import { useForm } from "react-hook-form";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { addAnnotationToProcess } from "apis/processes";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";
import { useUIStore } from "store/ui";
import { useRouter } from "next/router";

const AnnotationBloc = ({ token, processId }: any) => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();
  const showNotification = useUIStore((state) => state.showNotification);
  const setInfoAlertNotification = useUIStore(
    (state) => state.setInfoAlertNotification
  );
  const router = useRouter();

  const { handleSubmit, reset } = useForm();

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = ["bold", "italic", "list", "bullet", "link"];

  const onSubmit = async () => {
    const body = { comment: content };
    mutation.mutate(body);
  };

  const mutation = useMutation(
    ["addAnnotation"],
    (data: any) => addAnnotationToProcess(token, router.query.proccessId, data),
    {
      onSuccess: () => {
        setInfoAlertNotification({
          title: "Anotación creada",
          message: "Se ha creado la anotación correctamente.",
          icon: "good",
        });
        showNotification();
        reset();
        queryClient.invalidateQueries({
          queryKey: ["annotationsProcess"],
        });
        setContent("");
      },
    }
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className="mt-1">
        <div className="mt-1">
          <ReactQuill
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={setContent}
            className="min-h-[150px]"
          />
        </div>
      </div>

      <p>{processId}</p>

      <div className="">
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          {mutation.isLoading ? (
            <Ring color="#fff" size={20} />
          ) : (
            "  Añadir anotación"
          )}
        </button>
      </div>
    </form>
  );
};

export default AnnotationBloc;
