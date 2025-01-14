import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { Controller, useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Help, LongArrowRight } from "components/icons";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";
registerLocale("es", es);

const help = [
  `
  <p><strong>Fecha de validez DNI:</strong> Esta información se encuentra en la parte delantera de tu DNI, justo arriba de tu firma.</p>
  <p>Necesitamos esta información para poder presentar tu expediente al Juzgado correspondiente.</p>
`,
];

const DatosDni = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const setHelp = useUIStore((state) => state.setHelp);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

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

  useEffect(() => {
    setHelp(help);
  }, []);

  const dataProfile = usePortalStore((state) => state.dataProfile);
  const profile = usePortalStore((state) => state.profile);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Datos DNI",
      groupKey: "datosdni",
      groupNextKey: "hascambiadodeempadronamiento",
      properties: [
        {
          propertyKey: "dni",
          propertyValue: data.dni,
        },
        {
          propertyKey: "dniExpiration",
          propertyValue: data.dniExpiration,
        },
        {
          propertyKey: "birthDate",
          propertyValue: data.birthDate,
        },
        {
          propertyKey: "birthPlace",
          propertyValue: data.birthPlace,
        },
        {
          propertyKey: "nationality",
          propertyValue: data.nationality,
        },
      ],
    });
    setCurrentQuestion("hascambiadodeempadronamiento");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="Información del DNI" hasActions>
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
              <label
                htmlFor="dni"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Confirmar DNI
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  {...register("dni", { required: true })}
                  type="text"
                  name="dni"
                  id="dni"
                  defaultValue={dataProfile?.dni ? dataProfile.dni : ""}
                  autoComplete="given-name"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="dniExpiration"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Fecha validez DNI
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="dniExpiration"
                  render={({ field }) => (
                    <DatePicker
                      locale="es"
                      dateFormat="P"
                      placeholderText="Seleccionar fecha"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                    />
                  )}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="birthPlace"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Lugar de nacimiento
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  {...register("birthPlace", { required: true })}
                  type="text"
                  name="birthPlace"
                  id="birthPlace"
                  autoComplete="email"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="birthDate"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Fecha de nacimiento
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Controller
                  control={control}
                  rules={{ required: true }}
                  name="birthDate"
                  render={({ field }) => (
                    <DatePicker
                      locale="es"
                      dateFormat="P"
                      placeholderText="Seleccionar fecha"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                    />
                  )}
                />
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Nacionalidad
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <input
                  {...register("nationality", { required: true })}
                  type="text"
                  name="nationality"
                  id="nationality"
                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4 border-t mt-6 justify-end">
            <motion.button
              whileHover="hover"
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-secondary px-8 py-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 duration-150"
            >
              Siguiente
              <motion.div variants={textMotion}>
                <LongArrowRight className="ml-2 w-4 h-4 text-white" />
              </motion.div>
            </motion.button>
          </div>
        </form>
      </BodySection>
    </ComplexSectionBloc>
  );
};

export default DatosDni;
