import PortalLayout from "components/layouts/portal";
import type { NextPageWithLayout } from "../../../_app";
import React, { useState } from "react";
import type { ReactElement } from "react";

import Head from "next/head";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ReactAudioPlayer from "react-audio-player";
import { getTranscription } from "apis/transcriptions";
import { Chat } from "components/icons";
import SectionBloc from "components/layouts/components/section/sectionBloc";

const Transcripciones: NextPageWithLayout = () => {
  const [transcript, setTranscript] = useState<any>([]);
  const [formattedText, setFormattedText] = useState<string[]>([]);

  const mutation = useMutation({
    mutationFn: async (idCall: any) => getTranscription(idCall),
    onSuccess: async (data) => {
      setTranscript(data), setFormattedText(data.transcript.split("--"));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    mutation.mutate(data.idCall);
  };

  return (
    <div className="py-6 mx-auto max-w-7xl">
      <SectionBloc title="Transcripciones aircall">
        <div className="flex flex-col lg:flex-row justify-between items-center bg-white p-4 rounded-lg border">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row sm:space-x-4"
          >
            <div className="flex-1 sm:flex-none sm:w-72">
              <label
                htmlFor="idCall"
                className="block text-sm font-medium text-gray-700"
              >
                ID Llamada
              </label>
              <div className="mt-1">
                <input
                  {...register("idCall", { required: true })}
                  id="idCall"
                  name="idCall"
                  type="number"
                  className="block w-full appearance-none rounded-md border bg-gray-50 border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary sm:text-sm"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={mutation.isLoading}
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-secondary py-3 sm:py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-300"
              >
                <Chat className="w-5 h-5 mr-2" />
                {mutation.isLoading ? "Cargando" : "Obtener transcripción"}
              </button>
            </div>
          </form>
          <div className="mt-4 lg:mt-0">
            <ReactAudioPlayer src={transcript.source} controls />
          </div>
        </div>
        {formattedText.length > 0 && (
          <div className="mt-8">
            <div className="prose max-w-none mt-2 bg-white p-8 rounded-lg border">
              {formattedText.map((text, index) => (
                <p key={index}>{text}</p>
              ))}
            </div>
          </div>
        )}
      </SectionBloc>
    </div>
  );
};

Transcripciones.getLayout = function getLayout(page: ReactElement) {
  return <PortalLayout>{page}</PortalLayout>;
};

export default Transcripciones;
