import React, { useState, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { useUIStore } from "store/ui";
import {
  sendPushNotification,
  sendEmailNotification,
} from "apis/notifications";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Ring } from "@uiball/loaders";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Switch } from "@headlessui/react";

const MessageClient = ({ user, owner }: any) => {
  const queryClient = useQueryClient();
  const showNotification = useUIStore((state) => state.showNotification);
  const setInfoAlertNotification = useUIStore(
    (state) => state.setInfoAlertNotification
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      content: "",
      sendMail: true,
    },
  });

  const modules = {
    toolbar: [
      ["bold", "italic"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = ["bold", "italic", "list", "bullet", "link"];

  const sendAllNotifications = async (info: any) => {
    const data = {
      title: info.title,
      body: info.body,
      subtitle: info.body,
      data: {
        url: "/(app)/notificaciones/{notification_id}",
        content: info.content,
      },
    };

    const res = await sendPushNotification(user?.id, data);

    if (info.sendMail) {
      await sendEmailNotification(user, owner, info);
    }

    if (res.status === 200) {
      return true;
    }
    return false;
  };

  const mutation = useMutation(
    ["sendNotification"],
    (data) => sendAllNotifications(data),
    {
      onSuccess: () => {
        setInfoAlertNotification({
          title: "Notificación enviada",
          message: "El usuario ha recibido la notificación correctamente.",
          icon: "good",
        });
        showNotification();
        reset();
        queryClient.invalidateQueries({
          queryKey: ["userNotifications"],
        });
      },
    }
  );

  const onSubmit = async (data: any) => {
    // console.log(data);

    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className="mt-1">
        <input
          {...register("title")}
          type="text"
          placeholder="Título"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
        />
      </div>
      <div className="mt-1">
        <input
          {...register("body")}
          type="text"
          placeholder="Descripción para la app"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:text-sm"
        />
      </div>

      <div className="mt-1">
        <div className="mt-1">
          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <ReactQuill
                modules={modules}
                formats={formats}
                theme="snow"
                {...field}
                className="min-h-[150px]"
              />
            )}
          />
        </div>
      </div>
      <Controller
        name="sendMail"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch.Group>
            <div className="flex items-center">
              <Switch
                checked={value}
                onChange={onChange}
                className={`${
                  value ? "bg-secondary" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    value ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>

              <Switch.Label className="ml-2 text-sm text-gray-500">
                Enviar también por email
              </Switch.Label>
            </div>
          </Switch.Group>
        )}
      />

      <div className="">
        <button
          disabled={mutation.isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
        >
          {mutation.isLoading ? <Ring color="#fff" size={20} /> : "Enviar"}
        </button>
      </div>
    </form>
  );
};

export default MessageClient;
