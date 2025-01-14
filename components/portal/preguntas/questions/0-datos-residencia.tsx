import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import { Help, LongArrowRight } from "components/icons";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getClientAddress,
  addClientAddress,
  editClientAddress,
} from "apis/client";
import { Ring } from "@uiball/loaders";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Rellena estos campos en relación a tu lugar de residencia actual. La información debe hacer referencia al domicilio en el que estás empadronado actualmente.</p>
  <p><strong>Código Postal:</strong> Si no sabes el código postal de tu localidad, haz una búsqueda rápida en Google para averiguarlo al instante.</p>
`,
];

const DatosResidencia = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const setHelp = useUIStore((state) => state.setHelp);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);

  useEffect(() => {
    setHelp(help);
  }, []);

  const dirQuery = useQuery(["dir"], async () =>
    getClientAddress(profile.token, profile.id)
  );

  const editAddressMutation = useMutation(
    async (data: any) =>
      editClientAddress(profile.token, profile.id, dirQuery.data.id, data),
    {
      onSuccess: async (data) => {
        insertAddress(data);
      },
    }
  );

  const addAddressMutation = useMutation(
    async (data: any) => addClientAddress(profile.token, profile.id, data),
    {
      onSuccess: async (data) => {
        insertAddress(data);
      },
    }
  );

  const insertAddress = (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Dirección cliente",
      groupKey: "datosresidencia",
      groupNextKey: "datosdni",
      properties: [
        {
          propertyKey: "address",
          propertyValue: data.address,
        },
        {
          propertyKey: "zipcode",
          propertyValue: data.zip,
        },
        {
          propertyKey: "city",
          propertyValue: data.city,
        },
        {
          propertyKey: "province",
          propertyValue: data.province,
        },
      ],
    });
    setCurrentQuestion("datosdni");
  };

  const textMotion = {
    hover: {
      x: 10,
      transition: {
        duration: 0.4,
        type: "tween",
        ease: "easeOut",
      },
    },
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    if (dirQuery.data.length > 0) {
      editAddressMutation.mutate(data);
    } else {
      addAddressMutation.mutate(data);
    }
  };

  return (
    <div>
      <ComplexSectionBloc>
        <HeaderSection title="Datos de residencia actual" hasActions>
          <button
            className="text-gray-500 flex justify-center items-center"
            onClick={() => showHelpModal()}
          >
            <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
          </button>
        </HeaderSection>
        <BodySection>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dirección
                </label>
                <div className="mt-1">
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    name="address"
                    id="address"
                    className="block w-full rounded-md border-gray-300 py-2.0 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="zip"
                  className="block text-sm font-medium text-gray-700"
                >
                  Código postal
                </label>
                <div className="mt-1">
                  <input
                    {...register("zip", { required: true })}
                    type="text"
                    name="zip"
                    id="zip"
                    className="block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ciudad
                </label>
                <div className="mt-1">
                  <input
                    {...register("city", { required: true })}
                    type="text"
                    name="city"
                    id="city"
                    className="block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700"
                >
                  Provincia
                </label>
                <div className="mt-1">
                  <input
                    {...register("province", { required: true })}
                    type="text"
                    name="province"
                    id="province"
                    className="block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-4 pt-4 border-t mt-16 justify-end">
              <motion.button
                whileHover="hover"
                disabled={
                  editAddressMutation.isLoading || addAddressMutation.isLoading
                }
                type="submit"
                className="flex justify-center items-center rounded-md border border-transparent bg-secondary w-40 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
              >
                {editAddressMutation.isLoading ||
                addAddressMutation.isLoading ? (
                  <Ring size={16} color="#fff" />
                ) : (
                  <>
                    <p>Siguiente</p>
                    <motion.div variants={textMotion}>
                      <LongArrowRight className="ml-2 w-4 h-4 text-white" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </BodySection>
      </ComplexSectionBloc>
    </div>
  );
};

export default DatosResidencia;
