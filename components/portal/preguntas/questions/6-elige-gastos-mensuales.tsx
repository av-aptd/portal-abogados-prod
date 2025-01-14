import React, { useEffect } from "react";
import { usePreguntasStore } from "store/preguntas";
import ComplexSectionBloc from "components/layouts/components/section/complexSectionBloc";
import HeaderSection from "components/layouts/components/section/headerSection";
import BodySection from "components/layouts/components/section/bodySection";
import { usePortalStore } from "store/portal";
import { Help, LongArrowRight } from "components/icons";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useUIStore } from "store/ui";

const help = [
  `<p>Debes contabilizar todos los gastos, indicando el importe mensual de cada gasto.</p>
  <p>Añade cualquier tipo de gasto que debas asumir en tu día a día: hipoteca, financiación del vehículo, alquiler, comida, luz, agua, gas, internet, móvil, seguros, tabaco, transporte, gasolina, colegio, medicación, ocio, etc.</p>
  <p>No te preocupes por añadir gastos que puedas considerar más secundarios, nosotros lo revisaremos con posterioridad. Lo importante ahora es que tengamos una visión completa de tu situación económica actual.</p>
`,
];

const EligeGastosMensuales = () => {
  const answer = usePreguntasStore((state) => state.answer);
  const setCurrentQuestion = usePreguntasStore(
    (state) => state.setCurrentQuestion
  );
  const setHelp = useUIStore((state) => state.setHelp);
  const showHelpModal = useUIStore((state) => state.showHelpModal);
  const insertAnswer = usePreguntasStore((state) => state.insertAnswer);
  const profile = usePortalStore((state) => state.profile);

  const options = [
    {
      label: "Luz",
      value: "luz",
    },
    { label: "Agua", value: "agua" },
    {
      label: "Teléfono",
      value: "telefono",
    },
    {
      label: "Internet",
      value: "internet",
    },
    {
      label: "Comida",
      value: "comida",
    },
  ];

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
    watch,
    formState: { errors },
  } = useForm();

  const otro = watch("otro");

  const onSubmit = async (data: any) => {
    const gastos = data.gasto;

    if (data.otro) {
      gastos.push(data.otro_gasto);
    }

    insertAnswer({
      userId: profile.id,
      groupValue: "Elige tus gastos mensuales",
      groupKey: "eligegastosmensuales",
      groupNextKey: "cualestuactividad",
      properties: [
        {
          propertyKey: "eligeGastosMensuales",
          propertyValue: gastos,
        },
      ],
    });

    setCurrentQuestion("cualestuactividad");
  };

  return (
    <>
      <ComplexSectionBloc>
        <HeaderSection title="Elige tus gastos mensuales" hasActions>
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
              <div className="max-w-2xl space-y-4">
                {options?.map((option) => (
                  <div className="relative flex items-start" key={option.value}>
                    <div className="flex h-5 items-center">
                      <input
                        {...register("gasto", { required: true })}
                        type="checkbox"
                        id="gasto"
                        value={option.value}
                        // onChange={(e) => setOptions(e.target.value)}
                        className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-700"
                      >
                        {option.label}
                      </label>
                    </div>
                  </div>
                ))}
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      {...register("otro")}
                      type="checkbox"
                      id="otro"
                      value="otro"
                      // onChange={(e) => setOptions(e.target.value)}
                      className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-700"
                    >
                      Otro
                    </label>
                  </div>
                </div>
                {otro && (
                  <div className="ml-7">
                    {/* <label
                  htmlFor="province"
                  className="block text-sm font-medium text-gray-700"
                >
                  Otros
                </label> */}
                    <div className="mt-1">
                      <input
                        {...register("otro_gasto", { required: true })}
                        type="text"
                        id="otro_gasto"
                        className="block w-full rounded-md border-gray-300 py-2 px-4 shadow-sm focus:border-secondary focus:ring-secondary bg-gray-50"
                      />
                    </div>
                  </div>
                )}
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
    </>
  );
};

export default EligeGastosMensuales;
