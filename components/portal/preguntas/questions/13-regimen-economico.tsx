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
  `<p>Puedes ver el régimen económico en el certificado de matrimonio, documento que te dan al momento de casarte.</p>
  <p>Si te has casado sin elegir un régimen matrimonial, se aplica uno por defecto según el lugar donde te casaste.</p>  
  <p>Marca <strong>SEPARACIÓN DE BIENES</strong> si te has casado en una ciudad perteneciente a Aragón, Mallorca, Menorca, Ibiza, Formentera, Cataluña. O si te has casado en cualquier otra comunidad realizando capitulaciones matrimoniales a posteriori.</p>
  <p>Marca <strong>OTROS</strong> si te has casado en una ciudad de Navarra o del País Vasco y no has realizado capitulaciones matrimoniales a posteriori.</p>
  <p>Marca <strong>GANANCIALES</strong> si te has casado en una ciudad perteneciente a una provincia distinta a las mencionadas anteriormente.</p>
`,
];

const RegimenEconomico = () => {
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

  const options = [
    { label: "Separacion de bienes", value: "separacion" },
    { label: "Gananciales", value: "gananciales" },
    { label: "Otro", value: "otro" },
  ];

  const { register, handleSubmit, watch } = useForm();
  const watchShowOther = watch("regimen");

  const onSubmit = async (data: any) => {
    insertAnswer({
      userId: profile.id,
      groupValue: "¿Cuál es el régimen ecónomico?",
      groupKey: "regimeneconomico",
      groupNextKey: "cuantaspersonasdependendeti",
      properties: [
        {
          propertyKey: "regimenEconomico",
          propertyValue: data.regimen === "otro" ? data.other : data.regimen,
        },
      ],
    });

    setCurrentQuestion("cuantaspersonasdependendeti");
  };

  return (
    <ComplexSectionBloc>
      <HeaderSection title="¿Cuál es el régimen ecónomico?" hasActions>
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
                        {...register("regimen", { required: true })}
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

export default RegimenEconomico;
