import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { Controller, useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { Help, LongArrowRight } from "components/icons";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";

const help = [
  `<p>En el momento de inscribir la pareja de hecho en el Registro Civil, te entregaron un documento que acredita su inscripción. En dicho documento aparece la fecha de inscripción.</p>
  <p>Si no encuentras este documento, indica una fecha aproximada.</p>
`,
];

const FechaInscripcion = () => {
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );

  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);

  useEffect(() => {
    setHelp(help);
  }, []);

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
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Indique la fecha de inscripción",
      groupKey: "fechainscripcion",
      groupNextKey: "cuantaspersonasdependendeti",
      properties: [
        {
          propertyKey: "registrationDate",
          propertyValue: data.registrationDate,
        },
      ],
    });
    setCurrentQuestion("cuantaspersonasdependendeti");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="Indique la fecha de inscripción" hasActions>
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
            <div>
              <label
                htmlFor="registrationDate"
                className="block text-sm font-medium text-gray-700"
              >
                Día/Mes/Año
              </label>

              <div className="mt-1">
                <Controller
                  control={control}
                  name="registrationDate"
                  render={({ field }) => (
                    <DatePicker
                      locale="es"
                      dateFormat="P"
                      placeholderText="Seleccionar fecha"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
                      className="block w-full rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex space-x-4 pt-4 border-t mt-16 justify-end">
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

export default FechaInscripcion;
