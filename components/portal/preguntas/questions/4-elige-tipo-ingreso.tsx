import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import { useForm } from "react-hook-form";
import { usePortalStore } from "store/portal";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";

import { Help, LongArrowRight } from "components/icons";
import { motion } from "framer-motion";
import { useUIStore } from "store/ui";

const help = [
  `
  <p>Debes contabilizar todos los ingresos que recibes anualmente, dividiendo dicho importe en 12 mensualidades. Solo se contabilizan los ingresos que recibes tú, no los de cónyuges o familiares.</p>
  <p>Marca el tipo de ingresos que recibes: nómina, prestaciones sociales, rentas, facturas, pensión, etc.</p>
  <p>Si tienes varios ingresos, añade cada uno de ellos hasta completar la tabla.</p>
  <p>Si tienes otro tipo de ingresos, marca <strong>OTRO</strong> y escribe de qué tipo de ingresos se trata. En caso de no tener ningún ingreso, marca <strong>OTRO</strong> y escribe <strong>ninguno</strong>.</p>  
  <p>Una vez elegido el tipo de ingreso, indica cuánto cobras aproximadamente cada mes en relación a cada concepto. Si tus ingresos son variables, haz una media del último año.</p>
`,
];

const EligeTipoIngreso = () => {
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const { register, handleSubmit, watch } = useForm();
  const watchShowOther = watch("incomeType");

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

  const options = [
    { label: "Nómina", value: "nomina" },
    { label: "Pensión", value: "pension" },
    { label: "Rentas", value: "rentas" },
    { label: "Prestación o ayudas por desempleo", value: "desempleo" },
    { label: "Otro", value: "otro" },
  ];

  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "Elige el tipo de ingreso que tienes",
      groupKey: "eligetipoingreso",
      groupNextKey: "confirmagastosvivienda",
      properties: [
        {
          propertyKey: "tipoIngreso",
          propertyValue:
            data.incomeType === "otro" ? data.other : data.incomeType,
        },
      ],
    });
    setCurrentQuestion("confirmagastosvivienda");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="Elige el tipo de ingreso que tienes" hasActions>
        <button
          className="text-gray-500 flex justify-center items-center"
          onClick={() => showHelpModal()}
        >
          <Help className="w-7 h-7 text-gray-400 inline-block shrink-0" />
        </button>
      </HeaderSection>
      <BodySection>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div>
              <div className="max-w-2xl">
                <div className="mt-4 space-y-4">
                  {options?.map((option) => (
                    <div className="flex items-center" key={option.value}>
                      <input
                        {...register("incomeType", { required: true })}
                        type="radio"
                        value={option.value}
                        className="h-4 w-4 border-gray-300 text-secondary focus:ring-secondary"
                      />
                      <label
                        htmlFor="push-everything"
                        className="ml-3 block font-medium text-gray-500"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {watchShowOther === "otro" && (
              <div className="mt-8">
                <label
                  htmlFor="other"
                  className="block text-sm font-medium text-gray-700"
                >
                  Otro
                </label>
                <div className="mt-1">
                  <input
                    {...register("other", { required: true })}
                    type="text"
                    name="other"
                    id="other"
                    className="block w-auto rounded-md border-gray-300 py-2.5 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                  />
                </div>
              </div>
            )}
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

export default EligeTipoIngreso;
